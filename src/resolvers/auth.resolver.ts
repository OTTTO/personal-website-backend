import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthService } from 'services/auth.service';

@Resolver()
export class UserResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String, { name: 'signInAdmin' })
  async signInAdmin(@Args('email') email: string, @Args('password') password: string) {
    return await this.authService.signInAdmin(email, password);
  }
}
