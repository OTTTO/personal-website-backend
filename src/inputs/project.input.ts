import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field()
  content!: string;

  @Field({ nullable: true })
  img?: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field({ nullable: true })
  href?: string;

  @Field({ nullable: true })
  openNewTab!: boolean;

  @Field({ nullable: true })
  createdAt?: Date;
}
