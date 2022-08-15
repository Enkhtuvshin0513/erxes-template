import _ from 'lodash';
import { __ } from '@erxes/ui/src';
import React from 'react';
import ActionButtons from '@erxes/ui/src/components/ActionButtons';
import Button from '@erxes/ui/src/components/Button';
import Tip from '@erxes/ui/src/components/Tip';
import { ModalTrigger } from '@erxes/ui/src/components';
import Icon from '@erxes/ui/src/components/Icon';
import { ITemplate } from '../type';
import { IButtonMutateProps } from '../type';
import ListForm from './Form';

type Props = {
  template: ITemplate;
  removeTemplate: (id: string) => void;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
};

class TemplateRow extends React.Component<Props> {
  remove = () => {
    const { removeTemplate, template } = this.props;
    removeTemplate(template._id);
  };

  renderEditAction = () => {
    const content = props => <ListForm {...props} />;

    const editTrigger = (
      <Button btnStyle="link">
        <Tip text={__('Edit')} placement="bottom">
          <Icon icon="edit" />
        </Tip>
      </Button>
    );

    return (
      <ModalTrigger
        size="lg"
        title="Edit"
        trigger={editTrigger}
        content={content}
      />
    );
  };

  render() {
    const { template, removeTemplate } = this.props;

    const remove = () => {
      removeTemplate(template._id);
    };

    return (
      <tr>
        <td>{template.name}</td>
        <td>
          <ActionButtons>
            {this.renderEditAction()}
            <Tip text={__('Delete')} placement="bottom">
              <Button btnStyle="link" onClick={remove} icon="cancel-1" />
            </Tip>
          </ActionButtons>
        </td>
      </tr>
    );
  }
}

export default TemplateRow;
