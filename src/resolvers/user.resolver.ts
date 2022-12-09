import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from 'entities/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, hashPassword } from 'utils';

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

  @Query(() => Boolean, { name: 'signInAdmin' })
  async signInAdmin(@Args('email') email: string, @Args('password') password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    let auth = false;

    if (user && user.role == 'ADMIN') {
      auth = await comparePassword(password, user.password);
    }
    return auth;
  }
}
