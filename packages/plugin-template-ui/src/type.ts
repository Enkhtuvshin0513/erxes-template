import { QueryResponse } from '@erxes/ui/src/types';
import { MutationVariables } from '@erxes/ui/src/types';

export interface ITemplateDoc {
  name: string;
  contentType: string;
  content: object;
}

export interface ITemplate extends ITemplateDoc {
  _id: string;
}

export type ITemplatesQuery = {
  templatesQuery: ITemplate[];
} & QueryResponse;

export type BrandRemoveMutationResponse = {
  removeMutation: (params: { variables: MutationVariables }) => Promise<void>;
};

export type AppsRemoveMutationResponse = {
  appsRemove: (params: { variables: { _id: string } }) => Promise<string>;
};

export type TemplateRemoveMutationResponse = {
  removeTemplateMutation: (params: {
    variables: MutationVariables;
  }) => Promise<any>;
};
