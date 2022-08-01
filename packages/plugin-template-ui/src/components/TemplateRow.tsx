import _ from 'lodash';
import { __ } from '@erxes/ui/src';
import React from 'react';
import ActionButtons from '@erxes/ui/src/components/ActionButtons';
import Button from '@erxes/ui/src/components/Button';
import Tip from '@erxes/ui/src/components/Tip';
import { ModalTrigger } from '@erxes/ui/src/components';
import Icon from '@erxes/ui/src/components/Icon';

type Props = {
  template: any;
};

class TemplateRow extends React.Component<Props> {
  renderEditAction = () => {
    const { template } = this.props;

    const content = props => <>hi</>;

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
    const { template } = this.props;

    return (
      <tr>
        <td>{template.name}</td>
        <td>
          <ActionButtons>
            {this.renderEditAction()}
            <Tip text={__('Delete')} placement="bottom">
              <Button btnStyle="link" icon="cancel-1" />
            </Tip>
          </ActionButtons>
        </td>
      </tr>
    );
  }
}

export default TemplateRow;
