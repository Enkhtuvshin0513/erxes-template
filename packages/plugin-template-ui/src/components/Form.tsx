import { __, Button, Form } from '@erxes/ui/src';
import { IFormProps, IButtonMutateProps } from '@erxes/ui/src/types';
import React from 'react';
import { ModalFooter } from '@erxes/ui/src/styles/main';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import ErrorBoundary from '@erxes/ui/src/components/ErrorBoundary';
import { RenderDynamicComponent } from '@erxes/ui/src/utils/core';
import { IUser } from '@erxes/ui/src/auth/types';
import { ITemplate } from '../type';
import { withProps } from '@erxes/ui/src/utils';
import { graphql } from 'react-apollo';
import { queries } from '../graphql';
import {
  TemplateItemQueryResponse,
  TemplateRemoveMutationResponse,
  templatesTotalCount
} from '../type';

type Props = {
  closeModal: () => void;
  currentUser: IUser;
  contentType: string;
  activity: ITemplate;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  type: string;
};

type FinalProps = {
  templatesQuery: TemplateItemQueryResponse;
  templatesTotalCount: templatesTotalCount;
} & Props &
  TemplateRemoveMutationResponse;

type State = {};

class TemplateForm extends React.Component<FinalProps, State> {
  renderDynamicContent = () => {
    const { templatesQuery } = this.props;

    const templates = templatesQuery.templates;

    const plugins: any[] = (window as any).plugins || [];

    const pluginName = 'cards';

    for (const plugin of plugins) {
      if (pluginName === plugin.name && plugin.templateForm) {
        return (
          <ErrorBoundary>
            <RenderDynamicComponent
              scope={plugin.scope}
              component={plugin.templateForm}
              injectedProps={{
                templates,
                component: 'form'
              }}
            />
          </ErrorBoundary>
        );
      }
    }
  };

  renderContent = (formProps: IFormProps) => {
    const { closeModal, templatesQuery } = this.props;

    console.log(templatesQuery);

    return (
      <>
        {this.renderDynamicContent()}
        <ModalFooter>
          <Button btnStyle="simple" onClick={closeModal} icon="cancel-1">
            Close
          </Button>
        </ModalFooter>
      </>
    );
  };

  render() {
    return <Form renderContent={this.renderContent} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, TemplateItemQueryResponse, { contentType: string }>(
      gql(queries.templates),
      {
        name: 'templatesQuery'
      }
    )
  )(TemplateForm)
);
