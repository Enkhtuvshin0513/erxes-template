import React from 'react';
import { graphql } from 'react-apollo';
import Sidebar from '../components/Sidebar';
import { queries } from '../graphql';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { withProps } from '@erxes/ui/src/utils';
import Spinner from '@erxes/ui/src/components/Spinner';

type Props = {
  // currentType: string;
  // history: any;
};

type State = {};

type FinalProps = {
  templateGetServiceQuery: any;
} & Props;

class SideBarContainer extends React.Component<FinalProps, State> {
  render() {
    const { templateGetServiceQuery } = this.props;

    const templates = templateGetServiceQuery.templateGetService || [];

    return <Sidebar templates={templates} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props>(gql(queries.templateGetService), {
      name: 'templateGetServiceQuery'
    })
  )(SideBarContainer)
);
