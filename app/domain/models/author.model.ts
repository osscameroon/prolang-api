import mongoose, { Model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import { AuthorDocument } from '../../shared/types/models';

const authorSchema = new Schema(
  {
    birthDate: Schema.Types.Date,
    country: Schema.Types.String,
    link: Schema.Types.String,
    name: {
      index: true,
      required: true,
      type: Schema.Types.String,
      unique: true,
    },
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
