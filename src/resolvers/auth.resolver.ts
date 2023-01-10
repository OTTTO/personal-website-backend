import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthGuard } from 'guards/auth.guard';
import { AuthService } from 'services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String, { name: 'signInAdmin' })
  async signInAdmin(@Args('email') email: string, @Args('password') password: string) {
    return await this.authService.signInAdmin(email, password);
  }

  @Query(() => Boolean, { name: 'authenticate' })
  @UseGuards(AuthGuard)
  async authenticate() {
    return true;
  }
}
