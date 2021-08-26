import * as bcrypt from 'bcryptjs';

import { CreateUserInput, UserRoleEnum } from '../types/models';
import userService from '../../domain/services/user.service';
import { ADMIN_PASSWORD } from './config';
import { ADMIN_PASSWORD_NOT_SET } from '../utils/constants';

export const loadUsers = async () => {
  if (!ADMIN_PASSWORD) {
    throw new Error(ADMIN_PASSWORD_NOT_SET);
  }

  const userInput: CreateUserInput = {
    email: 'teco@prolang.com',
    name: 'Eric Cabrel',
    password: bcrypt.hashSync(ADMIN_PASSWORD),
    role: UserRoleEnum.admin,
  };

  const user = await userService.findByEmail(userInput.email);

  if (user) {
    return;
  }

  await userService.create(userInput);
};
