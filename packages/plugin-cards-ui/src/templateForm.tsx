import { IFormProps } from '@erxes/ui/src/types';
import { __, generateTree } from '@erxes/ui/src/utils';
import React from 'react';
import Form from '@erxes/ui/src/components/form/Form';
import { IDepartment } from '@erxes/ui/src/team/types';
import { FlexContent, FlexItem } from '@erxes/ui/src/layout/styles';
import { Formgroup } from '@erxes/ui/src/components/form/styles';
import ControlLabel from '@erxes/ui/src/components/form/Label';
import FormControl from '@erxes/ui/src/components/form/Control';
import { IBoard, IPipeline, IStage } from '@erxes/ui-cards/src/boards/types';
import FormGroup from '@erxes/ui/src/components/form/Group';
import Select from 'react-select-plus';
import { COLORS } from '@erxes/ui/src/constants/colors';
import { Flex } from '@erxes/ui/src/styles/main';
import { ExpandWrapper } from '@erxes/ui-settings/src/styles';
import { SelectMemberStyled } from '@erxes/ui-settings/src/boards/styles';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { ColorPick, ColorPicker } from '@erxes/ui/src/styles/main';
import Popover from 'react-bootstrap/Popover';
import TwitterPicker from 'react-color/lib/Twitter';
import SelectTeamMembers from '@erxes/ui/src/team/containers/SelectTeamMembers';
import { colors } from '@erxes/ui/src/styles';
import { IOption } from './settings/boards/types';

type Props = {
  boardId: string;
  renderExtraFields?: (formProps: IFormProps) => JSX.Element;
  pipeline?: IPipeline;
  boards: IBoard[];
  options?: IOption;
  type: string;
  templates: any[];
  stages?: IStage[];
  contentType: string;
  departments: IDepartment[];
};

type State = {
  visibility: string;
  saveAsTemplate: boolean;
  template: string;
  selectedMemberIds: string[];
  backgroundColor: string;
  departmentIds?: string[];
  numberSize?: string;
  numberConfig?: string;
  boardId: string;
  isCheckDepartment: boolean;
  excludeCheckUserIds: string[];
  isCheckUser: boolean;
  stages: IStage[];
};

class TemplateForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { pipeline, stages } = this.props;

    this.state = {
      saveAsTemplate: false,
      stages: (stages || []).map(stage => ({ ...stage })),
      visibility: pipeline ? pipeline.visibility || 'public' : 'public',
      boardId: props.boardId || '',
      excludeCheckUserIds: pipeline ? pipeline.excludeCheckUserIds || [] : [],
      isCheckUser: pipeline ? pipeline.isCheckUser || false : false,
      selectedMemberIds: pipeline ? pipeline.memberIds || [] : [],
      isCheckDepartment: pipeline ? pipeline.isCheckDepartment || false : false,
      backgroundColor:
        (pipeline && pipeline.bgColor) || colors.colorPrimaryDark,
      template: '',
      numberConfig: (pipeline && pipeline.numberConfig) || '',
      numberSize: (pipeline && pipeline.numberSize) || '',
      departmentIds: pipeline ? pipeline.departmentIds || [] : []
    };
  }
  onChangeVisibility = (e: React.FormEvent<HTMLElement>) => {
    this.setState({
      visibility: (e.currentTarget as HTMLInputElement).value
    });
  };
  onChangeValue = <T extends keyof State>(key: T, value: State[T]) => {
    this.setState(({ [key]: value } as unknown) as Pick<State, keyof State>);
  };
  onChangeStages = stages => {
    this.setState({ stages });
  };
  onColorChange = e => {
    this.setState({ backgroundColor: e.hex });
  };
  onChangeIsCheckUser = e => {
    const isChecked = (e.currentTarget as HTMLInputElement).checked;
    this.setState({ isCheckUser: isChecked });
  };
  onChangeDominantUsers = items => {
    this.setState({ excludeCheckUserIds: items });
  };
  onChangeDepartments = options => {
    this.setState({ departmentIds: (options || []).map(o => o.value) });
  };
  onChangeMembers = items => {
    this.setState({ selectedMemberIds: items });
  };
  onChangeIsSaveAsTemplate = e => {
    const isChecked = (e.currentTarget as HTMLInputElement).checked;
    this.setState({ saveAsTemplate: isChecked });
  };
  onChangeNumber = (key: string, value: string) => {
    this.setState({ [key]: value } as any);
  };
  onChangeIsCheckDepartment = e => {
    const isChecked = (e.currentTarget as HTMLInputElement).checked;
    this.setState({ isCheckDepartment: isChecked });
  };

  renderSelectMembers() {
    const { visibility, selectedMemberIds, departmentIds } = this.state;

    if (visibility === 'public') {
      return;
    }

    return (
      <>
        <FormGroup>
          <SelectMemberStyled zIndex={2003}>
            <ControlLabel>Members</ControlLabel>

            <SelectTeamMembers
              label="Choose members"
              name="selectedMemberIds"
              initialValue={selectedMemberIds}
              onSelect={this.onChangeMembers}
            />
          </SelectMemberStyled>
        </FormGroup>
        <FormGroup>
          <SelectMemberStyled zIndex={2002}>
            <ControlLabel>Departments</ControlLabel>
            <Select
              value={departmentIds}
              options={generateTree(
                this.props.departments,
                null,
                (node, level) => ({
                  value: node._id,
                  label: `${'---'.repeat(level)} ${node.title}`
                })
              )}
              onChange={this.onChangeDepartments.bind(this)}
              placeholder={__('Choose department ...')}
              multi={true}
            />
          </SelectMemberStyled>
        </FormGroup>
      </>
    );
  }

  renderContent = (formProps: IFormProps) => {
    const { saveAsTemplate } = this.state;
    const { pipeline, renderExtraFields, options } = this.props;

    const object = pipeline || ({} as IPipeline);

    const popoverBottom = (
      <Popover id="color-picker">
        <TwitterPicker
          width="266px"
          triangle="hide"
          color={this.state.backgroundColor}
          onChange={this.onColorChange}
          colors={COLORS}
        />
      </Popover>
    );

    return (
      <div id="manage-template-modal">
        <FlexContent>
          <FlexItem count={4}>
            <Formgroup>
              <ControlLabel required={true}>Template Name</ControlLabel>
              <FormControl
                {...formProps}
                name="templateName"
                autoFocus={true}
                required={true}
              />
            </Formgroup>
          </FlexItem>
        </FlexContent>

        <Flex>
          <ExpandWrapper>
            <FormGroup>
              <ControlLabel required={true}>Visibility</ControlLabel>
              <FormControl
                {...formProps}
                name="visibility"
                componentClass="select"
                value={this.state.visibility}
                onChange={this.onChangeVisibility}
              >
                <option value="public">{__('Public')}</option>
                <option value="private">{__('Private')}</option>
              </FormControl>
            </FormGroup>
          </ExpandWrapper>
          <FormGroup>
            <ControlLabel>Background</ControlLabel>
            <div>
              <OverlayTrigger
                trigger="click"
                rootClose={true}
                placement="bottom"
                overlay={popoverBottom}
              >
                <ColorPick>
                  <ColorPicker
                    style={{ backgroundColor: this.state.backgroundColor }}
                  />
                </ColorPick>
              </OverlayTrigger>
            </div>
          </FormGroup>
        </Flex>

        {/* <FormGroup>
          <ControlLabel>Stages</ControlLabel>
          <div id="stages-in-pipeline-form">
            <Stages
              // options={options}
              type={this.props.type}
              stages={this.state.stages}
              onChangeStages={this.onChangeStages}
              departments={this.props.departments}
            />
          </div>
        </FormGroup> */}
      </div>
    );
  };

  render() {
    return <Form renderContent={this.renderContent} />;
  }
}

export default TemplateForm;
