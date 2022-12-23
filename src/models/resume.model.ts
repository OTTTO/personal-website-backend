import { Field, ObjectType } from '@nestjs/graphql';
import { Education } from 'entities/resume/education.entity';
import { Experience } from 'entities/resume/experience.entity';
import { ResumeHeader } from 'entities/resume/resumeHeader.entity';
import { SkillGroup } from 'entities/resume/skillGroup.entity';

@ObjectType()
export class Resume {
  @Field(() => ResumeHeader)
  resumeHeader: ResumeHeader;

  @Field(() => [SkillGroup])
  skillGroupList: SkillGroup[];

  @Field(() => [Experience])
  experienceList: Experience[];

  @Field(() => [Education])
  educationList: Education[];
}
