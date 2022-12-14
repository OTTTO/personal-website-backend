import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from 'entities/resume/education.entity';
import { Experience } from 'entities/resume/experience.entity';
import { Responsibility } from 'entities/resume/responsibility.entity';
import { ResumeHeader } from 'entities/resume/resumeHeader.entity';
import { SkillGroup } from 'entities/resume/skillGroup.entity';
import { User } from 'entities/user/user.entity';
import { ResumeResolver } from 'resolvers/resume.resolver';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, SkillGroup, Experience, Education, Responsibility, ResumeHeader]), AuthModule],
  providers: [ResumeResolver],
})
export class ResumeModule {}
