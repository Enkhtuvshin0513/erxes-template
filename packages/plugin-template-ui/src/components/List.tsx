import { __ } from '@erxes/ui/src/utils';
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

type Props = {
  queryParams: any;
  templates: ITemplate[];
  removeTemplate: (id: string) => void;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  currentType: string;
  loading: boolean;
  history: any;
  totalCount: number;
};

type FinalProps = {
  templatesQuery: ITemplatesQuery[];
} & Props;

class List extends React.Component<FinalProps> {
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

  render() {
    const { currentType, history, loading } = this.props;

    const breadcrumb = [
      { title: __('Settings'), link: '/settings' },
      { title: __('template'), link: '/settings/template-library' }
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

    const content = props => <BrandForm />;

    const leftActionBar = <Title>Template library</Title>;

    const righActionBar = (
      <ModalTrigger
        size="lg"
        title="New template"
        autoOpenKey="showBrandAddModal"
        trigger={addTemplate}
        content={content}
      />
    );

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
          <Wrapper.ActionBar left={leftActionBar} right={righActionBar} />
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
