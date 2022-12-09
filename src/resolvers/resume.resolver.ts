import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
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

@Resolver()
export class ResumeResolver {
  constructor(
    @InjectRepository(SkillGroup) private readonly skillGroupRepository: Repository<SkillGroup>,
    @InjectRepository(Experience) private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(Responsibility) private readonly responsibilityRepository: Repository<Responsibility>,
    @InjectRepository(Education) private readonly educationRepository: Repository<Education>,
    private readonly authService: AuthService,
  ) {}

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
