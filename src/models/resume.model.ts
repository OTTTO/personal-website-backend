import { Field, ObjectType } from '@nestjs/graphql';
import { Education } from 'entities/resume/education.entity';
import { Experience } from 'entities/resume/experience.entity';
import { SkillGroup } from 'entities/resume/skillGroup.entity';

@ObjectType()
export class Resume {
  @Field(() => [SkillGroup])
  skillGroupList: SkillGroup[];

  @Field(() => [Experience])
  experienceList: Experience[];

  @Field(() => [Education])
  educationList: Education[];
}
