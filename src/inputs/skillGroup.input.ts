import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SkillGroupInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  name!: string;

  @Field()
  skills!: string;
}
