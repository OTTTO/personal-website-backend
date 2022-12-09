import { Module } from '@nestjs/common';
import { UserResolver } from 'resolvers/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user/user.entity';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserResolver],
})
export class UserModule {}
