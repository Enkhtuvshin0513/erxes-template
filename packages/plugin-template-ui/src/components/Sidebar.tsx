import { Wrapper } from '@erxes/ui/src';
import React from 'react';
import TemplateTypeFilter from './TemplateTypeFilter';

type Props = {
  templates: any[];
};

class SidebarList extends React.Component<Props> {
  render() {
    const { templates } = this.props;

    return (
      <Wrapper.Sidebar>
        <TemplateTypeFilter templates={templates} />
      </Wrapper.Sidebar>
    );
  }
}

export default SidebarList;
