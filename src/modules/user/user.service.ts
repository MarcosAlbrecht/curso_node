import { PrismaClient } from '@prisma/client';

import { BadRequestException } from '@exceptions/bad-request-exception';
import { NotFoundException } from '@exceptions/not-found-exception';
import { CreatePasswordHashed } from '@utils/password';
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
  const userEmail = await getUserByEmail(body.email).catch(() => undefined);

  if (userEmail) {
    throw new BadRequestException('Email already exists');
  }

  const userCpf = await getUserByCpf(body.cpf).catch(() => undefined);

  if (userCpf) {
    throw new BadRequestException('CPF already exists');
  }

  const user: UserInsertDTO = {
    ...body,
    password: await CreatePasswordHashed(body.password),
  };

  return prisma.user.create({ data: user });
};

export const getUserByEmail = async (email: string): Promise<UserModel> => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new NotFoundException('User');
  }

  return user;
};

export const getUserByCpf = async (cpf: string): Promise<UserModel> => {
  const user = await prisma.user.findFirst({
    where: {
      cpf,
    },
  });

  if (!user) {
    throw new NotFoundException('User');
  }

  return user;
};
