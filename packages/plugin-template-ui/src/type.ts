import { QueryResponse } from '@erxes/ui/src/types';
import { MutationVariables } from '@erxes/ui/src/types';
import { IBrand as IBrandC } from '@erxes/ui/src/brands/types';

export type IBrand = IBrandC & { emailConfig: any };

export interface ITemplateDoc {
  name: string;
  contentType: string;
  content: object;
  _id: string;
  totalcount: number;
}

export interface ITemplate extends ITemplateDoc {
  _id: string;
}

export interface ITemplateItem {
  list: ITemplate[];
  count: number;
}

export type templatesTotalCount = {
  templatesTotalCount: number;
} & QueryResponse;

export type IButtonMutateProps = {
  name?: string;
  values: any;
  isSubmitted: boolean;
  confirmationUpdate?: boolean;
  callback?: () => void;
  resetSubmit?: () => void;
  size?: string;
  object?: any;
  text?: string;
  icon?: string;
  type?: string;
  disableLoading?: boolean;
};

export type ITemplatesQuery = {
  templatesQuery: ITemplate[];
} & QueryResponse;

export type TemplateRemoveMutationResponse = {
  removeTemplateMutation: (params: {
    variables: MutationVariables;
  }) => Promise<any>;
};

export type TemplateItemQueryResponse = {
  templates: ITemplateItem;
  stopPolling: () => any;
} & QueryResponse;

export type IOptions = {
  boardName: string;
  templateName: string;
  StageItem: any;
  PipelineForm: any;
  additionalButton?: string;
  additionalButtonText?: string;
};
