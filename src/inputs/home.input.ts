import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class HomeInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  intro!: string;

  @Field()
  websiteInfo!: string;

  @Field({ nullable: true })
  mainImg?: string;
}
