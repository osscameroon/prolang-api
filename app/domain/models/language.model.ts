import mongoose, { Model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import { LanguageDocument } from '../../shared/types/models';

const languageSchema = new Schema(
  {
    authors: {
      index: true,
      ref: 'AuthorModel',
      type: [Schema.Types.ObjectId],
    },
    company: Schema.Types.String,
    link: Schema.Types.String,
    listed: {
      default: false,
      required: true,
      type: Schema.Types.Boolean,
    },
    name: {
      index: true,
      required: true,
      type: Schema.Types.String,
    },
    nameExtra: {
      link: Schema.Types.String,
      name: Schema.Types.String,
    },
    predecessors: {
      index: true,
      ref: 'LanguageModel',
      type: [Schema.Types.ObjectId],
    },
    yearConfirmed: {
      default: true,
      required: true,
      type: Schema.Types.Boolean,
    },
    yearGroup: {
      index: true,
      ref: 'YearGroupModel',
      required: true,
      type: Schema.Types.ObjectId,
    },
    years: {
      index: true,
      required: true,
      type: [Schema.Types.Number],
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
