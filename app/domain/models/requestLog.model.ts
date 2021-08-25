import mongoose, { Model, Schema } from 'mongoose';
import { RequestLogDocument, RequestTypeEnum } from '../../shared/types/models';

const requestLogSchema = new Schema(
  {
    endpoint: {
      required: true,
      type: Schema.Types.String,
    },
    ipAddress: {
      required: true,
      type: Schema.Types.String,
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
