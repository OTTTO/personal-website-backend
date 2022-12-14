import { ObjectType, Field } from '@nestjs/graphql';
import { Education } from 'entities/resume/education.entity';
import { Experience } from 'entities/resume/experience.entity';
import { ResumeHeader } from 'entities/resume/resumeHeader.entity';
import { SkillGroup } from 'entities/resume/skillGroup.entity';
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  role: 'ADMIN' | 'USER';

  @OneToMany(() => SkillGroup, (skillGroup) => skillGroup.user, { cascade: true })
  skillGroups: SkillGroup[];

  @OneToMany(() => Experience, (experience) => experience.user, { cascade: true })
  experiences: Experience[];

  @OneToMany(() => Education, (education) => education.user, { cascade: true })
  educations: Education[];

  @OneToOne(() => ResumeHeader, (header) => header.user, { cascade: true })
  resumeHeader: ResumeHeader;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
