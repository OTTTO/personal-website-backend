import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'entities/projects/project.entity';
import { ProjectResolver } from 'resolvers/project.resolver';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), AuthModule],
  providers: [ProjectResolver],
})
export class ProjectModule {}
