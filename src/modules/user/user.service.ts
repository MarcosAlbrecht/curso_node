import { PrismaClient } from '@prisma/client';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { UserModel } from './user.model';

const prisma = new PrismaClient();
export const getUsers = async (): Promise<UserModel[]> => {
  return prisma.user.findMany();
};

export const createUser = async (body: UserInsertDTO): Promise<UserModel> => {
  return prisma.user.create({ data: body });
};
