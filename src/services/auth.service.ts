import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user/user.entity';
import { Repository } from 'typeorm';
import { comparePassword } from 'utils';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async signInAdmin(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    let token = '';

    if (user && user.role == 'ADMIN' && (await comparePassword(password, user.password))) {
      token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      );
    }
    return token;
  }

  async verifyAccessToken(accessToken: string) {
    let valid: boolean;
    try {
      jwt.verify(accessToken, process.env.JWT_SECRET);
      valid = true;
    } catch {
      valid = false;
    }
    return valid;
  }

  getJwt(req): string {
    const bearerToken = req.headers.authorization;
    const jwt = bearerToken?.split(' ')[1];
    return jwt;
  }

  parseJwt(token: string) {
    try {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    } catch (err) {
      throw new AuthenticationError('Malformed or missing authorization token');
    }
  }

  getUserId(req): string {
    const token = this.getJwt(req);
    return this.parseJwt(token)['userId'];
  }

  async isAdmin(req): Promise<boolean> {
    const userId = this.getUserId(req);
    const user = await this.userRepository.findOneBy({ id: userId });
    return user && user.role === 'ADMIN';
  }
}
