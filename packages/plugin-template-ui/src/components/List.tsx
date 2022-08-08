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
import { IButtonMutateProps } from '@erxes/ui/src/types';
import Templaterow from './TemplateRow';
import { ITemplate, ITemplatesQuery } from '../type';
import Sidebar from '../containers/Sidebar';

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
    const { templates, templatesQuery, removeTemplate } = this.props;

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
              />
            ])}
          </tbody>
        </Table>
        <Pagination count={10} />
      </>
    );
  }

  render() {
    const { currentType, history, loading, totalCount } = this.props;

    const breadcrumb = [
      { title: __('Settings'), link: '/settings' },
      { title: __('template'), link: '/settings/template-library' }
    ];

    const addBrand = (
      <Button
        id={'New Template'}
        btnStyle="success"
        block={true}
        icon="plus-circle"
      >
        Add template
      </Button>
    );

    const content = props => <>hi</>;

    const leftActionBar = <Title>Template library</Title>;

    const righActionBar = (
      <ModalTrigger
        size="lg"
        title="New template"
        autoOpenKey="showBrandAddModal"
        trigger={addBrand}
        content={content}
      />
    );

    return (
      <Wrapper
        header={<Wrapper.Header title={'template'} breadcrumb={breadcrumb} />}
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
            emptyText="There is no brand."
            emptyImage="/images/actions/20.svg"
          />
        }
        leftSidebar={<Sidebar history={history} currentType={currentType} />}
      />
    );
  }
}

export default List;
