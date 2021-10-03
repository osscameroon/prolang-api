import mongoose, { Model, Schema } from 'mongoose';
import { RequestLogDocument, RequestTypeEnum } from '../../shared/types/models';

const requestLogSchema = new Schema(
  {
    duration: {
      default: null,
      type: Schema.Types.Number,
    },
    endpoint: {
      required: true,
      type: Schema.Types.String,
    },
    ipAddress: {
      index: true,
      type: Schema.Types.String,
    },
    statusCode: {
      default: null,
      type: Schema.Types.Number,
    },
    type: {
      enum: RequestTypeEnum,
      type: Schema.Types.String,
    },
  },
  {
    collection: 'requests_logs',
    timestamps: true,
  },
);

const RequestLogModel: Model<RequestLogDocument> = mongoose.model<RequestLogDocument>(
  'RequestLogModel',
  requestLogSchema,
);

export { RequestLogModel };
