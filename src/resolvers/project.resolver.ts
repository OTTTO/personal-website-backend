import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'guards/admin.guard';
import { AuthGuard } from 'guards/auth.guard';
import { Project } from 'entities/projects/project.entity';
import { ProjectInput } from 'inputs/project.input';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(@InjectRepository(Project) private readonly projectRepository: Repository<Project>) {}
  @Query(() => [Project], { name: 'projects' })
  async getProjects() {
    return await this.projectRepository.find({});
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async updateProjects(@Args({ name: 'projects', type: () => [ProjectInput] }) projects: ProjectInput[]) {
    ///Get current projects
    const projectIdsInDb = (await this.projectRepository.find({})).map((project) => project.id);

    ///Save projects
    const projectIds = [];
    for (const project of projects) {
      if (project.id) projectIds.push(project.id);
      await this.projectRepository.save({ ...project });
    }

    ///Delete projects
    const projectIdsToDelete = projectIdsInDb.filter((id) => !projectIds.includes(id));
    for (const id of projectIdsToDelete) {
      await this.projectRepository.delete(id);
    }

    return true;
  }
}
