import { Field, InputType } from '@nestjs/graphql';
import { ResponsibilityInput } from './responsibility.input';

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

  @Field(() => [ResponsibilityInput])
  responsibilities!: ResponsibilityInput[];
}
