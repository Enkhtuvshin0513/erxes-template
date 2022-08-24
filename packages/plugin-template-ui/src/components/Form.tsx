import { __, Button, Form } from '@erxes/ui/src';
import { IFormProps } from '@erxes/ui/src/types';
import React from 'react';
import { ModalFooter } from '@erxes/ui/src/styles/main';
import ErrorBoundary from '@erxes/ui/src/components/ErrorBoundary';
import { RenderDynamicComponent } from '@erxes/ui/src/utils/core';

type Props = { closeModal: () => void };

type State = {};

class TemplateForm extends React.Component<Props, State> {
  renderDynamicContent = () => {
    const plugins: any[] = (window as any).plugins || [];

    const pluginName = 'cards';

    for (const plugin of plugins) {
      if (pluginName === plugin.name && plugin.templateForm) {
        return (
          <ErrorBoundary>
            <RenderDynamicComponent
              scope={plugin.scope}
              component={plugin.templateForm}
              injectedProps={{}}
            />
          </ErrorBoundary>
        );
      }
    }
  };

  renderContent = (formProps: IFormProps) => {
    const { closeModal } = this.props;

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

export default TemplateForm;
