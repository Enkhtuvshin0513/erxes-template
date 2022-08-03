import Button from '@erxes/ui/src/components/Button';
// import EmptyState from 'modules/common/components/EmptyState';
// import LoadMore from 'modules/common/components/LoadMore';
import ModalTrigger from '@erxes/ui/src/components/ModalTrigger';
// import Spinner from 'modules/common/components/Spinner';
// import { TopHeader } from "modules/common/styles/main";
import { IButtonMutateProps } from '@erxes/ui/src/types';
// import LeftSidebar from 'modules/layout/components/Sidebar';
// import { SidebarList as List } from 'modules/layout/styles';
import BrandForm from '@erxes/ui/src/brands/components/BrandForm';
import React from 'react';
import { ITemplate } from '../type';
// import BrandRow from "./BrandRow";
import ActionButtons from '@erxes/ui/src/components/ActionButtons';
import Tip from '@erxes/ui/src/components/Tip';
import { __ } from '@erxes/ui/src/utils';
import Icon from '@erxes/ui/src/components/Icon';

type Props = {
  Templates: ITemplate[];
  remove: (TemplateId: string) => void;
  loading: boolean;
  currentTempalteId?: string;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
};

class Sidebar extends React.Component<Props, {}> {
  renderEditAction = template => {
    const { renderButton } = this.props;

    const editTrigger = (
      <Button btnStyle="link">
        <Tip text={__('Edit')} placement="bottom">
          <Icon icon="edit" />
        </Tip>
      </Button>
    );

    const content = props => (
      <BrandForm
        {...props}
        brand={template}
        extended={true}
        renderButton={renderButton}
      />
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

  remove = template => {
    const { remove } = this.props;

    remove(template._id);
  };

  render() {
    const { Templates } = this.props;

    return Templates.map(template => (
      <tr key={template._id}>
        <td>{template.name}</td>
        <td>
          <ActionButtons>
            <ActionButtons>
              {this.renderEditAction(template)}
              <Tip text={__('Delete')} placement="bottom">
                <Button
                  btnStyle="link"
                  onClick={() => this.remove(template)}
                  icon="cancel-1"
                />
              </Tip>
            </ActionButtons>
          </ActionButtons>
        </td>
      </tr>
    ));
  }
}

export default Sidebar;
