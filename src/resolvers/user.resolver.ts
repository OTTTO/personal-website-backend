import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'inputs/createUser.input';

@Resolver(() => User)
export class UserResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = this.userRepository.create(createUserInput);
    return await this.userRepository.save(user);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.userRepository.find();
  }
}