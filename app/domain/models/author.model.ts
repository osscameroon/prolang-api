import mongoose, { Model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import { AuthorDocument } from '../../shared/types/models';

const authorSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      index: true,
    },
    birthDate: Schema.Types.Date,
    country: Schema.Types.String,
    link: Schema.Types.String,
    picture: Schema.Types.String,
  },
  {
    collection: 'authors',
    timestamps: true,
  },
);

authorSchema.plugin(mongoosePaginate);

const AuthorModel: Model<AuthorDocument> = mongoose.model<AuthorDocument>('AuthorModel', authorSchema);

export { AuthorModel };
