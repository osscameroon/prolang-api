import mongoose, { Model, Schema } from 'mongoose';
import { YearGroupDocument } from '../../shared/types/models';

const yearGroupSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    collection: 'years_groups',
    timestamps: true,
  },
);

const YearGroupModel: Model<YearGroupDocument> = mongoose.model<YearGroupDocument>('YearGroup', yearGroupSchema);

export { YearGroupModel };
