import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExperienceInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  role!: string;

  @Field()
  company!: string;

  @Field()
  location!: string;

  @Field()
  time!: string;
}
