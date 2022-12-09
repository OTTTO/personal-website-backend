import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from 'entities/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'utils';

@Resolver(() => User)
export class UserResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Mutation(() => User)
  async createUser(@Args('email') email: string, @Args('password') password: string) {
    const user = this.userRepository.create({
      email,
      password: await hashPassword(password),
      role: 'USER',
    });
    return await this.userRepository.save(user);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }
}
