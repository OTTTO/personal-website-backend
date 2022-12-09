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
  @Field(() => String)
  details: string;

  @ManyToOne(() => Experience, (experience) => experience.responsibilities)
  experience: Experience;
}
