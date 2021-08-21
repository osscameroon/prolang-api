import mongoose, { Model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import { LanguageDocument } from '../../shared/types/models';

const languageSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    years: {
      type: [Schema.Types.Number],
      required: true,
      index: true,
    },
    yearConfirmed: {
      type: Schema.Types.Boolean,
      required: true,
      default: true,
    },
    nameExtra: {
      name: Schema.Types.String,
      link: Schema.Types.String,
    },
    company: Schema.Types.String,
    link: Schema.Types.String,
    yearGroup: {
      type: Schema.Types.ObjectId,
      ref: 'YearGroup',
      required: true,
      index: true,
    },
    authors: {
      type: [Schema.Types.ObjectId],
      ref: 'Author',
      index: true,
    },
    predecessors: {
      type: [Schema.Types.ObjectId],
      ref: 'Language',
      index: true,
    },
    listed: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
  },
  {
    collection: 'languages',
    timestamps: true,
  },
);

languageSchema.index({ name: 1, years: 1 }, { unique: true });
languageSchema.plugin(mongoosePaginate);

const LanguageModel: Model<LanguageDocument> = mongoose.model<LanguageDocument>('LanguageModel', languageSchema);

export { LanguageModel };
