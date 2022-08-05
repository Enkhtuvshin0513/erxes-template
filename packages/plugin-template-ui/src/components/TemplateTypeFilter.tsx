import React from 'react';
import { Link } from 'react-router-dom';
import { __ } from '@erxes/ui/src/utils';
import { SidebarList as List } from '@erxes/ui/src/layout/styles';
import LeftSidebar from '@erxes/ui/src/layout/components/Sidebar';

type Props = {
  templates: any[];
  currentType: any;
};

class SidebarList extends React.Component<Props> {
  renderSidebarHeader = () => {
    const { Header } = LeftSidebar;

    return (
      <div>
        <Header uppercase={true}> Type List </Header>
      </div>
    );
  };

  renderListItem(template: any) {
    const { contentType, text } = template;
    const { currentType } = this.props;

    const className =
      currentType && currentType === contentType ? 'active' : '';

    return (
      <li key={Math.random()}>
        <Link to={`?type=${contentType}`} className={className}>
          {__(text)}
        </Link>
      </li>
    );
  }

  renderList() {
    const { templates } = this.props;

    return (
      <List id="templates">
        {templates.map(template => this.renderListItem(template))}
      </List>
    );
  }
  render() {
    return (
      <LeftSidebar header={this.renderSidebarHeader()} hasBorder={true}>
        <LeftSidebar.Section>{this.renderList()}</LeftSidebar.Section>
      </LeftSidebar>
    );
  }
}

export default SidebarList;
