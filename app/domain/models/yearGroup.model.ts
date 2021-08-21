import mongoose, { Model, Schema } from 'mongoose';
import { YearGroupDocument } from '../../shared/types/models';

const yearGroupSchema = new Schema(
  {
    name: {
      index: true,
      required: true,
      type: Schema.Types.String,
      unique: true,
    },
    position: {
      required: true,
      type: Schema.Types.Number,
    },
  },
  {
    collection: 'years_groups',
    timestamps: true,
  },
);

const YearGroupModel: Model<YearGroupDocument> = mongoose.model<YearGroupDocument>('YearGroup', yearGroupSchema);

export { YearGroupModel };
