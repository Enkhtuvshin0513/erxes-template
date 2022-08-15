import FormControl from '@erxes/ui/src/components/form/Control';
import FormGroup from '@erxes/ui/src/components/form/Group';
import ControlLabel from '@erxes/ui/src/components/form/Label';
import { IFormProps } from '@erxes/ui/src/types';
import { IBoard, IPipeline, IStage } from '@erxes/ui-cards/src/boards/types';
import React from 'react';
import CommonForm from '@erxes/ui-settings/src/common/components/Form';
import { ICommonFormProps } from '@erxes/ui-settings/src/common/types';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select-plus';
import { ColorPick, ColorPicker, Flex } from '@erxes/ui/src/styles/main';
import { ExpandWrapper } from '@erxes/ui-settings/src/styles';
import { __, generateTree } from '@erxes/ui/src/utils';
import { OverlayTrigger } from '@erxes/ui/src/components/step/preview/styles';
import { SelectMemberStyled } from '@erxes/ui-settings/src/boards/styles';
import SelectTeamMembers from '@erxes/ui/src/team/containers/SelectTeamMembers';
import { FlexContent, FlexItem } from '@erxes/ui/src/layout/styles';
import Stages from './stage';
import { IButtonMutateProps, IOptions } from '../type';

import { IDepartment } from '@erxes/ui/src/team/types';
import { pipeline } from 'stream';

type Props = {
  object?;
  type: string;
  show: boolean;
  boardId: string;
  pipeline?: IPipeline;
  stages?: IStage[];
  boards: IBoard[];
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  closeModal: () => void;
  options?: IOptions;
  renderExtraFields?: (formProps: IFormProps) => JSX.Element;
  extraFields?: any;
  departments: IDepartment[];
  templates: any[];
} & ICommonFormProps;

type state = {
  saveAsTemplate: boolean;
  stages: IStage[];
};

class Form extends React.Component<Props & ICommonFormProps, state, {}> {
  generateDoc = (values: { _id?: string; name: string; content: string }) => {
    const { object } = this.props;
    const finalValues = values;

    if (object) {
      finalValues._id = object._id;
    }

    return {
      _id: finalValues._id,
      name: finalValues.name
    };
  };

  onChangeStages = stages => {
    this.setState({ stages });
  };

  renderContent = (formProps: IFormProps) => {
    const { options, pipeline } = this.props;
    <div>
      <Modal.Header closeButton={true}>
        <Modal.Title>
          `{pipeline ? `${__('Tempalte')}` : `${__('Add project')}`}
        </Modal.Title>
      </Modal.Header>
    </div>;
  };

  render() {
    return (
      <Modal enforceFocus={false} animation={false} size="xl">
        <Form renderContent={this.renderContent} />
      </Modal>
    );
  }
}

export default Form;
