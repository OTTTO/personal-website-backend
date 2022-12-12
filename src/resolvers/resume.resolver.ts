import { Resolver, Query, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillGroupInput } from 'inputs/skillGroup.input';
import { SkillGroup } from 'entities/resume/skillGroup.entity';
import { Experience } from 'entities/resume/experience.entity';
import { Responsibility } from 'entities/resume/responsibility.entity';
import { Education } from 'entities/resume/education.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'guards/auth.guard';
import { AuthService } from 'services/auth.service';
import { ExperienceInput } from 'inputs/experience.input';
import { EducationInput } from 'inputs/education.input';
import { ResponsibilityInput } from 'inputs/responsibility.input';
import { UserInputError } from 'apollo-server-express';
import { Resume } from 'models/resume.model';
import { User } from 'entities/user/user.entity';
import { ResumeInput } from 'inputs/resume.input';

@Resolver(() => Resume)
export class ResumeResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(SkillGroup) private readonly skillGroupRepository: Repository<SkillGroup>,
    @InjectRepository(Experience) private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(Responsibility) private readonly responsibilityRepository: Repository<Responsibility>,
    @InjectRepository(Education) private readonly educationRepository: Repository<Education>,
    private readonly authService: AuthService,
  ) {}

  @Query(() => Resume, { name: 'resume' })
  async getResume() {
    const resume = new Resume();
    const admin = await this.userRepository.findOneBy({ role: 'ADMIN' });
    resume.skillGroupList = await this.skillGroupRepository.findBy({ userId: admin.id });
    resume.experienceList = await this.experienceRepository.findBy({ userId: admin.id });
    for (const experience of resume.experienceList) {
      experience.responsibilities = await this.responsibilityRepository.findBy({ experienceId: experience.id });
    }
    resume.educationList = await this.educationRepository.findBy({ userId: admin.id });
    return resume;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async upsertResume(@Args('resume') resume: ResumeInput, @Context('req') req) {
    const userId = this.authService.getUserId(req);

    //Techincal Skills
    if (resume.skillGroups) {
      for (const skillGroup of resume.skillGroups) {
        await this.skillGroupRepository.save({ ...skillGroup, userId });
      }
    }

    //Professional Experience
    if (resume.experience) {
      for (const experience of resume.experience) {
        const exp = await this.experienceRepository.save({ ...experience, userId });
        for (const responsibility of experience.responsibilities) {
          await this.responsibilityRepository.save({ ...responsibility, experienceId: exp.id });
        }
      }
    }

    //Education
    if (resume.education) {
      for (const education of resume.education) {
        await this.educationRepository.save({ ...education, userId });
      }
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async upsertSkillGroup(@Args('data') skillGroupInput: SkillGroupInput, @Context('req') req) {
    const userId = this.authService.getUserId(req);
    await this.skillGroupRepository.upsert({ ...skillGroupInput, userId }, ['id']);
    return true;
  }

  @Query(() => [SkillGroup], { name: 'skillGroups' })
  @UseGuards(AuthGuard)
  async getSkillGroups(@Context('req') req) {
    const userId = this.authService.getUserId(req);
    return await this.skillGroupRepository.findBy({ userId });
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async upsertExperience(@Args('data') experienceInput: ExperienceInput, @Context('req') req) {
    const userId = this.authService.getUserId(req);
    await this.experienceRepository.upsert({ ...experienceInput, userId }, ['id']);
    return true;
  }

  @Query(() => [Experience], { name: 'experience' })
  @UseGuards(AuthGuard)
  async getExperience(@Context('req') req) {
    const userId = this.authService.getUserId(req);
    return await this.experienceRepository.findBy({ userId });
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async upsertResponsibility(@Args('data') responsibilityInput: ResponsibilityInput, @Context('req') req) {
    const userId = this.authService.getUserId(req);
    const experience = await this.experienceRepository.findOneBy({ userId, id: responsibilityInput.experienceId });
    if (!experience) return false;
    await this.responsibilityRepository.upsert({ ...responsibilityInput }, ['id']);
    return true;
  }

  @Query(() => [Responsibility], { name: 'responsibilities' })
  @UseGuards(AuthGuard)
  async getResponsibilities(@Args('experienceId') experienceId: string, @Context('req') req) {
    const userId = this.authService.getUserId(req);
    const experience = await this.experienceRepository.findOneBy({ userId, id: experienceId });
    if (!experience) throw new UserInputError('experienceId does not match for any experience owned by this user');
    return await this.responsibilityRepository.findBy({ experienceId });
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async upsertEducation(@Args('data') educationInput: EducationInput, @Context('req') req) {
    const userId = this.authService.getUserId(req);
    await this.educationRepository.upsert({ ...educationInput, userId }, ['id']);
    return true;
  }

  @Query(() => [Education], { name: 'education' })
  @UseGuards(AuthGuard)
  async getEducation(@Context('req') req) {
    const userId = this.authService.getUserId(req);
    return await this.educationRepository.findBy({ userId });
  }
}
