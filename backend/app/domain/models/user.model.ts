import mongoose, { Model, Schema } from 'mongoose';

import { UserDocument, UserRoleEnum } from '../../shared/types/models';

const userSchema = new Schema(
  {
    email: {
      index: true,
      required: true,
      type: Schema.Types.String,
      unique: true,
    },
    name: {
      required: true,
      type: Schema.Types.String,
      unique: true,
    },
    password: {
      required: true,
      type: Schema.Types.String,
    },
    role: {
      enum: UserRoleEnum,
      required: true,
      type: Schema.Types.String,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('UserModel', userSchema);

export { UserModel };
