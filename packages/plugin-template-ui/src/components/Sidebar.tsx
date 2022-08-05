import { Wrapper } from '@erxes/ui/src';
import React from 'react';
import TemplateTypeFilter from './TemplateTypeFilter';

type Props = {
  templates: any[];
  currentType?: any;
};

class SidebarList extends React.Component<Props> {
  render() {
    const { templates, currentType } = this.props;

    return (
      <Wrapper.Sidebar>
        <TemplateTypeFilter templates={templates} currentType={currentType} />
      </Wrapper.Sidebar>
    );
  }
}

export default SidebarList;
