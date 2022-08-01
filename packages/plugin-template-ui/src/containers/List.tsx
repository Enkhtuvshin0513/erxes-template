import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import { withProps } from '@erxes/ui/src/utils';
import { queries } from '../graphql';
import React from 'react';
import TemplateList from '../components/List';

type Props = {
  queryParams: any;
  loading: boolean;
  type: string;
};

type FinalProps = {
  templatesQuery: any;
} & Props;

class ListContainer extends React.Component<FinalProps> {
  render() {
    const { templatesQuery } = this.props;

    const templates = templatesQuery.templates || [];

    const extendedProps = {
      ...this.props,
      templates
    };

    return <TemplateList {...extendedProps} />;
  }
}

export default withProps<FinalProps>(
  compose(
    graphql<Props, any>(gql(queries.templates), {
      name: 'templatesQuery',
      options: ({ type }) => ({
        variables: { contentType: `cards:${type}` }
      })
    })
  )(ListContainer)
);
