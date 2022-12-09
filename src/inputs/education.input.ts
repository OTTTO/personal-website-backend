import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EducationInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  institution!: string;

  @Field()
  achievement!: string;

  @Field()
  time!: string;
}
