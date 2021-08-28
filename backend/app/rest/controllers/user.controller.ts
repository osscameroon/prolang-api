import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userService from '../../domain/services/user.service';
import { LOGIN_FAILED, RECORD_NOT_FOUND_MESSAGE, USER_ALREADY_EXISTS } from '../../shared/utils/constants';
import { transformUserResponse } from '../../domain/responses/user.response';
import { CreateUserInput, LoginInput, UpdateUserInput } from '../../shared/types/models';
import { TokenPayload } from '../../shared/types/common';
import { JWT_EXPIRE, JWT_SECRET } from '../../shared/core/config';

const create = async (req: Request, res: Response) => {
  const { email, name, password, role }: CreateUserInput = req.body;

  const user = await userService.findByEmail(email);

  if (user) {
    return res.status(400).json({ message: USER_ALREADY_EXISTS });
  }

  const createdUser = await userService.create({
    email,
    name,
    password: bcrypt.hashSync(password),
    role,
  });

  return res.json({ data: transformUserResponse(createdUser) });
};

const login = async (req: Request, res: Response) => {
  const { email, password }: LoginInput = req.body;

  const user = await userService.findByEmail(email);

  if (!user) {
    return res.status(400).json({ message: LOGIN_FAILED });
  }

  const isMatch: boolean = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: LOGIN_FAILED });
  }

  const tokenInfo: TokenPayload = {
    id: user.id,
    role: user.role,
  };

  const token = jwt.sign(tokenInfo, JWT_SECRET, { expiresIn: JWT_EXPIRE });

  return res.json({ data: { expiresIn: JWT_EXPIRE, token } });
};

const getAll = async (_req: Request, res: Response) => {
  const result = await userService.findAll();

  return res.json({ data: transformUserResponse(result) });
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await userService.findById(id);

  if (!item) {
    return res.status(404).json({ message: RECORD_NOT_FOUND_MESSAGE('Author', id) });
  }

  return res.json({ data: transformUserResponse(item) });
};

const current = async (req: any, res: Response) => {
  const userId = req.user.id;
  const user = await userService.findById(userId);

  if (!user) {
    return res.status(404).json({ message: RECORD_NOT_FOUND_MESSAGE('User', userId) });
  }

  return res.json({ data: transformUserResponse(user) });
};

const update = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { email, name, password, role }: UpdateUserInput = req.body;

  const user = await userService.findByEmail(email);

  if (user && user._id !== userId) {
    return res.status(400).json({ message: USER_ALREADY_EXISTS });
  }

  const passwordInput = password ? { password: bcrypt.hashSync(password) } : {};

  await userService.update(userId, {
    email,
    name,
    role,
    ...passwordInput,
  });

  const updateUser = await userService.findOneOrFail({ id: userId });

  return res.json({ data: transformUserResponse(updateUser) });
};

export { create, current, getAll, getOne, login, update };
