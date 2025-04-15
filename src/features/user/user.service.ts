import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../../database/database.service';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  private async encodePassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return { salt, hashPassword };
  }

  private async comparePassword(
    password: string,
    hashPassword: string | null,
    salt: string | null,
  ) {
    const _hashPassword = await bcrypt.hash(password || '', salt || '');
    return _hashPassword === hashPassword;
  }

  create(createUserDto: Prisma.UserCreateInput) {
    return 'This action adds a new user';
  }

  async findAll() {
    try {
      const list = await this.prisma.user.findMany();
      console.log({ list });
    } catch (error) {
      // console.log({ error: error });
    }

    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
