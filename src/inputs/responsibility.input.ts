import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ResponsibilityInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  experienceId?: string;

  @Field()
  details!: string;
}
