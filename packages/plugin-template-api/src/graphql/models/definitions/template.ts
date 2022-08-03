import * as Random from 'meteor-random';
import * as _ from 'underscore';
import { Document, Schema } from 'mongoose';

/*
 * Mongoose field options wrapper
 */
const field = options => {
  const { pkey, type, optional } = options;

  if (type === String && !pkey && !optional) {
    options.validate = /\S+/;
  }

  // TODO: remove
  if (pkey) {
    options.type = String;
    options.default = () => Random.id();
  }

  return options;
};

export interface ITemplate {
  name: string;
  contentType: string;
  content: object;
}

export interface ITemplateDocument extends ITemplate, Document {
  _id: string;
  createdAt: Date;
}

export const templateSchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: 'Name' }),
  contentType: field({ type: String, label: 'Content Type' }),
  content: field({ type: Object, label: 'Content' })
});
