import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UseGuards } from '@nestjs/common';
import { Home } from 'entities/home/home.entity';
import { AdminGuard } from 'guards/admin.guard';
import { HomeInput } from 'inputs/home.input';
import { AuthGuard } from 'guards/auth.guard';

@Resolver(() => Home)
export class HomeResolver {
  constructor(@InjectRepository(Home) private readonly homeRepository: Repository<Home>) {}

  @Query(() => Home, { name: 'home' })
  async getHome() {
    return (await this.homeRepository.findOneBy({})) || new Home();
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async updateHome(@Args('home') home: HomeInput) {
    await this.homeRepository.save({ ...home });
    return true;
  }
}
