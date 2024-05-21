import { NotFoundException } from '@exceptions/not-found-exception';
import { PrismaClient } from '@prisma/client';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { UserModel } from './user.model';

const prisma = new PrismaClient();
export const getUsers = async (): Promise<UserModel[]> => {
  const users = await prisma.user.findMany();

  if (users?.length === 0) {
    throw new NotFoundException('User');
  }
  return users;
};

export const createUser = async (body: UserInsertDTO): Promise<UserModel> => {
  return prisma.user.create({ data: body });
};
