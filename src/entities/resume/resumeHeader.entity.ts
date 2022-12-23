import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'entities/user/user.entity';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
@ObjectType()
export class ResumeHeader {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { defaultValue: uuid() })
  id: string;

  @Column()
  @Field(() => String, { defaultValue: 'Dylan Beckwith' })
  name: string;

  @Column()
  @Field(() => String, { defaultValue: 'Software Engineer' })
  title: string;

  @Column()
  @Field(() => String)
  userId: string;

  @OneToOne(() => User, (user) => user.resumeHeader)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
