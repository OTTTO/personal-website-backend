import { Module } from "@nestjs/common";
import { UserResolver } from "resolvers/user.resolver";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserResolver]
  })
  export class UserModule {}