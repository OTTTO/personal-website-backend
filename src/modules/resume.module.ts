import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from 'entities/resume/education.entity';
import { Experience } from 'entities/resume/experience.entity';
import { Responsibility } from 'entities/resume/responsibility.entity';
import { SkillGroup } from 'entities/resume/skillGroup.entity';
import { ResumeResolver } from 'resolvers/resume.resolver';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillGroup]),
    TypeOrmModule.forFeature([Experience]),
    TypeOrmModule.forFeature([Responsibility]),
    TypeOrmModule.forFeature([Education]),
    AuthModule,
  ],
  providers: [ResumeResolver],
})
export class ResumeModule {}
