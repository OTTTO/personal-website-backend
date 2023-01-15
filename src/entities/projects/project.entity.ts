import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  content: string;

  @Column({ type: 'uuid', nullable: true })
  @Field(() => String, { nullable: true })
  img: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  subtitle: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  href: string;

  @Column({ nullable: true })
  @Field(() => Boolean, { nullable: true })
  openNewTab: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
