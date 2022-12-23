import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Home {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { defaultValue: '' })
  id: string;

  @Column({ length: 1200 })
  @Field(() => String, { defaultValue: 'intro' })
  intro: string;

  @Column({ length: 1200 })
  @Field(() => String, { defaultValue: 'website info' })
  websiteInfo: string;
}
