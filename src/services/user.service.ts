import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'utils';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async signUpAdmin() {
    const admin = await this.userRepository.findBy({ role: 'ADMIN' });
    if (admin.length === 0) {
      await this.userRepository.save({ email: process.env.ADMIN_EMAIL, password: await hashPassword(process.env.ADMIN_PASSWORD), role: 'ADMIN' });
    }
  }
}
