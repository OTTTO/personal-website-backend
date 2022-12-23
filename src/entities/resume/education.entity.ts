import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'entities/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Number)
  position: number;

  @Column()
  @Field(() => String)
  institution: string;

  @Column()
  @Field(() => String)
  achievement: string;

  @Column()
  @Field(() => String)
  time: string;

  @Column()
  @Field(() => String)
  userId: string;

  @ManyToOne(() => User, (user) => user.educations)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
