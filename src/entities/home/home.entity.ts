import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Home {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { defaultValue: '' })
  id: string;

  @Column()
  @Field(() => String, { defaultValue: 'intro' })
  intro: string;

  @Column()
  @Field(() => String, { defaultValue: 'website info' })
  websiteInfo: string;

  @Column({ type: 'uuid', nullable: true })
  @Field(() => String, { nullable: true })
  mainImg: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
