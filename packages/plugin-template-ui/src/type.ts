import { QueryResponse } from '@erxes/ui/src/types';
import { MutationVariables } from '@erxes/ui/src/types';
import { IBrand as IBrandC } from '@erxes/ui/src/brands/types';

export type IBrand = IBrandC & { emailConfig: any };

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

export type contentTypeList = {
  contentTypeList: ITemplate[];
} & QueryResponse;

export type TemplateRemoveMutationResponse = {
  removeTemplateMutation: (params: {
    variables: MutationVariables;
  }) => Promise<any>;
};
