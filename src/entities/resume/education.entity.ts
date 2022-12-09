import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'entities/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  institution: string;

  @Column()
  @Field(() => String)
  achievement: string;

  @Column()
  @Field(() => String)
  time: string;

  @ManyToOne(() => User, (user) => user.educations)
  user: User;
}