import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user/user.entity';
import { AuthResolver } from 'resolvers/auth.resolver';
import { AuthService } from 'services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
