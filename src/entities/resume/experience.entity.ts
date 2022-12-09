import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'entities/user/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Responsibility } from './responsibility.entity';

@Entity()
@ObjectType()
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  role: string;

  @Column()
  @Field(() => String)
  company: string;

  @Column()
  @Field(() => String)
  location: string;

  @Column()
  @Field(() => String)
  time: string;

  @ManyToOne(() => User, (user) => user.experiences)
  user: User;

  @OneToMany(() => Responsibility, (responsibility) => responsibility.experience, { cascade: true })
  responsibilities: Responsibility[];
}
