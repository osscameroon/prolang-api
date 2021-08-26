import { UserDocument } from '../../shared/types/models';
import { UserResponse } from '../../shared/types/responses';
import { transformResponse } from './response';

const generateUserResponse = (item: UserDocument): UserResponse => {
  return {
    email: item.email,
    id: item._id,
    name: item.name,
    role: item.role,
  };
};

export const transformUserResponse = (data: UserDocument | UserDocument[]) => {
  return transformResponse<UserDocument, UserResponse>(data, generateUserResponse);
};
