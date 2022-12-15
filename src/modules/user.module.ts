import { Module } from '@nestjs/common';
import { UserResolver } from 'resolvers/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user/user.entity';
import { AuthModule } from './auth.module';
import { UserService } from 'services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
