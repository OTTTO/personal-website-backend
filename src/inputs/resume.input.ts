import { Field, InputType } from '@nestjs/graphql';
import { EducationInput } from './education.input';
import { ExperienceInput } from './experience.input';
import { SkillGroupInput } from './skillGroup.input';

@InputType()
export class ResumeInput {
  @Field(() => [SkillGroupInput], { nullable: true })
  skillGroups?: SkillGroupInput[];

  @Field(() => [ExperienceInput], { nullable: true })
  experience?: ExperienceInput[];

  @Field(() => [EducationInput], { nullable: true })
  education?: EducationInput[];
}
