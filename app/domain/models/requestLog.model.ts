import mongoose, { Model, Schema } from 'mongoose';
import { RequestLogDocument, RequestTypeEnum } from '../../shared/types/models';

const requestLogSchema = new Schema(
  {
    type: {
      type: Schema.Types.String,
      enum: RequestTypeEnum,
    },
    endpoint: {
      type: Schema.Types.String,
      required: true,
    },
    ipAddress: {
      type: Schema.Types.String,
      required: true,
    },
    succeed: {
      type: Schema.Types.Boolean,
      required: true,
      index: true,
      default: true,
    },
  },
  {
    collection: 'requests_logs',
    timestamps: true,
  },
);

const RequestLogModel: Model<RequestLogDocument> = mongoose.model<RequestLogDocument>('RequestLogModel', requestLogSchema);

export { RequestLogModel };
