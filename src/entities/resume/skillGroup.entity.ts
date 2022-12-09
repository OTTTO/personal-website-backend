import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'entities/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SkillGroup {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  skills: string;

  @Column()
  @Field(() => String)
  userId: string;

  @ManyToOne(() => User, (user) => user.skillGroups)
  user: User;
}
