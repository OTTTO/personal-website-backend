import { Field, InputType } from '@nestjs/graphql';
import { EducationInput } from './education.input';
import { ExperienceInput } from './experience.input';
import { ResumeHeaderInput } from './resumeHeader.input';
import { SkillGroupInput } from './skillGroup.input';

@InputType()
export class ResumeInput {
  @Field(() => ResumeHeaderInput, { nullable: true })
  resumeHeader?: ResumeHeaderInput;

  @Field(() => [SkillGroupInput], { nullable: true })
  skillGroups?: SkillGroupInput[];

  @Field(() => [ExperienceInput], { nullable: true })
  experience?: ExperienceInput[];

  @Field(() => [EducationInput], { nullable: true })
  education?: EducationInput[];
}
