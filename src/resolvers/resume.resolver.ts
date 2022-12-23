import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillGroup } from 'entities/resume/skillGroup.entity';
import { Experience } from 'entities/resume/experience.entity';
import { Responsibility } from 'entities/resume/responsibility.entity';
import { Education } from 'entities/resume/education.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'guards/auth.guard';
import { AuthService } from 'services/auth.service';
import { Resume } from 'models/resume.model';
import { User } from 'entities/user/user.entity';
import { ResumeInput } from 'inputs/resume.input';
import { ResumeHeader } from 'entities/resume/resumeHeader.entity';

@Resolver(() => Resume)
export class ResumeResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(SkillGroup) private readonly skillGroupRepository: Repository<SkillGroup>,
    @InjectRepository(Experience) private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(Responsibility) private readonly responsibilityRepository: Repository<Responsibility>,
    @InjectRepository(Education) private readonly educationRepository: Repository<Education>,
    @InjectRepository(ResumeHeader) private readonly resumeHeaderRepository: Repository<ResumeHeader>,
    private readonly authService: AuthService,
  ) {}

  @Query(() => Resume, { name: 'resume' })
  async getResume() {
    //Always get admin resume
    const admin = await this.userRepository.findOneBy({ role: 'ADMIN' });
    const resume = new Resume();
    resume.skillGroupList = await this.skillGroupRepository.findBy({ userId: admin.id });
    resume.experienceList = await this.experienceRepository.findBy({ userId: admin.id });
    for (const experience of resume.experienceList) {
      experience.responsibilities = await this.responsibilityRepository.findBy({ experienceId: experience.id });
    }
    resume.educationList = await this.educationRepository.findBy({ userId: admin.id });
    resume.resumeHeader = (await this.resumeHeaderRepository.findOneBy({ userId: admin.id })) || new ResumeHeader();
    return resume;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async updateResume(@Args('resume') resume: ResumeInput, @Context('req') req) {
    const userId = this.authService.getUserId(req);

    //Save Resume Header
    await this.resumeHeaderRepository.save({ ...resume.resumeHeader, userId });

    //Techincal Skills
    const skillGroups = await this.skillGroupRepository.findBy({ userId });
    const skillGroupIds = skillGroups.map((group) => group.id);
    const resumeSkillGroupIds = resume.skillGroups.map((group) => group.id);

    ////Delete Skills
    skillGroupIds.forEach(async (id) => {
      if (!resumeSkillGroupIds.includes(id)) {
        await this.skillGroupRepository.delete({ id });
      }
    });

    ////Save Skills
    if (resume.skillGroups) {
      for (const skillGroup of resume.skillGroups) {
        await this.skillGroupRepository.save({ ...skillGroup, userId });
      }
    }

    //Professional Experience and Responsibilities
    ////Delete Experience
    const experience = await this.experienceRepository.findBy({ userId });
    const experienceIds = experience.map((exp) => exp.id);
    const resumeExperienceIds = resume.experience.map((exp) => exp.id);

    const removedIds = [];
    experienceIds.forEach(async (id) => {
      if (!resumeExperienceIds.includes(id)) {
        removedIds.push(id);
        const responsibilities = await this.responsibilityRepository.findBy({ experienceId: id });

        ////Delete Responsibilities Attached to an Experience
        for (const responsibility of responsibilities) {
          await this.responsibilityRepository.delete(responsibility);
        }
        await this.experienceRepository.delete({ id });
      }
    });

    if (resume.experience) {
      for (const experience of resume.experience) {
        if (removedIds.includes(experience.id)) continue;
        ////Delete Individual Responsibilities
        const responsibility = await this.responsibilityRepository.findBy({ experienceId: experience.id });
        const responsibilityIds = responsibility.map((res) => res.id);
        const resumeResponsibilityIds = experience.responsibilities.map((res) => res.id);

        responsibilityIds.forEach(async (id) => {
          if (!resumeResponsibilityIds.includes(id)) {
            await this.responsibilityRepository.delete({ id });
          }
        });

        ////Save Experience and Responsibilities
        if (experience.responsibilities.length == 0) {
          delete experience.responsibilities;
          await this.experienceRepository.save({ ...experience, userId });
        } else {
          await this.experienceRepository.save({ ...experience, userId });
          for (const responsibility of experience.responsibilities) {
            await this.responsibilityRepository.save({ ...responsibility, experienceId: experience.id });
          }
        }
      }
    }

    //Education
    const education = await this.educationRepository.findBy({ userId });
    const educationIds = education.map((edu) => edu.id);
    const resumeEducationIds = resume.education.map((edu) => edu.id);

    ////Delete Education
    educationIds.forEach(async (id) => {
      if (!resumeEducationIds.includes(id)) {
        await this.educationRepository.delete({ id });
      }
    });

    ////Save Education
    if (resume.education) {
      for (const education of resume.education) {
        await this.educationRepository.save({ ...education, userId });
      }
    }

    return true;
  }
}
