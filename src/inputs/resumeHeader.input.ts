import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ResumeHeaderInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  name!: string;

  @Field()
  title!: string;
}
