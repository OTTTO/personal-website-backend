import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from 'entities/home/home.entity';
import { User } from 'entities/user/user.entity';
import { HomeResolver } from 'resolvers/home.resolver';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Home]), AuthModule],
  providers: [HomeResolver],
})
export class HomeModule {}
