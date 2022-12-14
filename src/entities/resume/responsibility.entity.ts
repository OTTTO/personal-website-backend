import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Experience } from './experience.entity';

@Entity()
@ObjectType()
export class Responsibility {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Number)
  position: number;

  @Column()
  @Field(() => String)
  details: string;

  @Column()
  @Field(() => String)
  experienceId: string;

  @ManyToOne(() => Experience, (experience) => experience.responsibilities)
  experience: Experience;
}
