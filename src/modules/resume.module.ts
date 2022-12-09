import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from 'entities/resume/education.entity';
import { Experience } from 'entities/resume/experience.entity';
import { Responsibility } from 'entities/resume/responsibility.entity';
import { SkillGroup } from 'entities/resume/skillGroup.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillGroup]),
    TypeOrmModule.forFeature([Experience]),
    TypeOrmModule.forFeature([Responsibility]),
    TypeOrmModule.forFeature([Education]),
  ],
  providers: [],
})
export class ResumeModule {}
