import React from 'react';
import { graphql } from 'react-apollo';
import Sidebar from '../components/Sidebar';
import { queries } from '../graphql';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { withProps, router } from '@erxes/ui/src/utils';
import Spinner from '@erxes/ui/src/components/Spinner';

type Props = {
  currentType: string;
  history: any;
};

type State = {};

type FinalProps = {
  templateGetServiceQuery: any;
} & Props;

class SideBarContainer extends React.Component<FinalProps, State> {
  render() {
    const { templateGetServiceQuery, history, currentType } = this.props;

    const templates = templateGetServiceQuery.templateGetService || [];

    if (!router.getParam(history, 'type') && templates.length !== 0) {
      router.setParams(history, { type: templates[0].contentType }, true);
    }

    return <Sidebar templates={templates} currentType={currentType} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props>(gql(queries.templateGetService), {
      name: 'templateGetServiceQuery'
    })
  )(SideBarContainer)
);
