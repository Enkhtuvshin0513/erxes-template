import { router, __ } from '@erxes/ui/src/utils';
import React from 'react';
import Table from '@erxes/ui/src/components/table/index';
import Pagination from '@erxes/ui/src/components/pagination/Pagination';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import Button from '@erxes/ui/src/components/Button';
import ModalTrigger from '@erxes/ui/src/components/ModalTrigger';
import DataWithLoader from '@erxes/ui/src/components/DataWithLoader';
import HeaderDescription from '@erxes/ui/src/components/HeaderDescription';
import { Title } from '@erxes/ui-settings/src/styles';
import Templaterow from './TemplateRow';
import { ITemplate, ITemplatesQuery } from '../type';
import BrandForm from '@erxes/ui/src/brands/components/BrandForm';
import Sidebar from '../containers/Sidebar';
import { IButtonMutateProps } from '../type';
import { IOptions } from '../type';
import { Link } from 'react-router-dom';
import { BarItems } from '@erxes/ui/src/layout/styles';
import FormControl from '@erxes/ui/src/components/form/Control';
import { IPipeline } from '@erxes/ui-cards/src/boards/types';

type Props = {
  queryParams: any;
  templates: ITemplate[];
  removeTemplate: (id: string) => void;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  currentType: string;
  pipeline: IPipeline[];
  loading: boolean;
  type: string;
  history: any;
  options?: IOptions;
  totalCount: number;
  searchValue: string;
};

type FinalProps = {
  templatesQuery: ITemplatesQuery[];
} & Props;

type State = {
  searchValue: string;
};

class List extends React.Component<FinalProps, State> {
  private timer?: NodeJS.Timer = undefined;

  constructor(props) {
    super(props);

    this.state = {
      searchValue: this.props.searchValue
    };
  }

  renderContent() {
    const { templates, renderButton, removeTemplate, totalCount } = this.props;

    return (
      <>
        <Table>
          <thead>
            <tr>
              <th>{__('Template')}</th>
              <th>{__('Actions')}</th>
            </tr>
          </thead>
          <tbody id="templatelist">
            {templates.map((template, e) => [
              <Templaterow
                template={template}
                key={template._id}
                removeTemplate={removeTemplate}
                renderButton={renderButton}
              />
            ])}
          </tbody>
        </Table>
        <Pagination count={totalCount} />
      </>
    );
  }

  search = e => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const { history } = this.props;
    const searchValue = e.target.value;

    this.setState({ searchValue });
    this.timer = setTimeout(() => {
      router.removeParams(history, 'page');
      router.setParams(history, { searchValue });
    }, 500);
  };

  renderAdditionalButton = () => {
    const { options } = this.props;

    if (options && options.additionalButton) {
      return (
        <Link to={options.additionalButton}>
          <Button icon="arrow-to-right" btnStyle="simple">
            {options.additionalButtonText}
          </Button>
        </Link>
      );
    }

    return null;
  };

  addTempalate = () => {
    this.setState({
      showModal: true
    });
  };

  renderButton() {
    const { options, history } = this.props;
    const templateName = options ? options.templateName : 'Tempalate';

    return (
      <BarItems>
        <FormControl
          type="text"
          placeholder={__('Type to search')}
          onChange={this.search}
          value={this.state.searchValue}
          autoFocus={true}
        />

        {this.renderAdditionalButton()}
        <Button
          btnStyle="success"
          icon="plus-circle"
          onClick={this.addTempalate}
        >
          Add {templateName}
        </Button>
      </BarItems>
    );
  }

  render() {
    const { currentType, history, loading, type } = this.props;

    const breadcrumb = [
      { title: __('settings'), link: '/settings' },
      { title: __('template'), link: '/templates/' }
    ];

    const addTemplate = (
      <Button
        id={'New Template'}
        btnStyle="success"
        block={true}
        icon="plus-circle"
      >
        Add template
      </Button>
    );

    const content = props => <></>;

    const leftActionBar = <Title>Template library</Title>;

    return (
      <Wrapper
        header={<Wrapper.Header title={'Template'} breadcrumb={breadcrumb} />}
        footer={<Pagination count={10} />}
        mainHead={
          <HeaderDescription
            icon="/images/actions/32.svg"
            title={'Template library'}
            description={__('Add template')}
          />
        }
        actionBar={
          <Wrapper.ActionBar
            left={leftActionBar}
            right={this.renderButton()}
            withMargin
            wide
          />
        }
        content={
          <DataWithLoader
            data={this.renderContent()}
            loading={loading}
            emptyText="There is no templates."
            emptyImage="/images/actions/20.svg"
          />
        }
        leftSidebar={<Sidebar history={history} currentType={currentType} />}
      />
    );
  }
}

export default List;
