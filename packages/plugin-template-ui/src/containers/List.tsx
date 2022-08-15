import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import { mutations, queries } from '../graphql';
import React from 'react';
import TemplateList from '../components/List';
import { __ } from '@erxes/ui/src/utils';
import Spinner from '@erxes/ui/src/components/Spinner';
import {
  TemplateItemQueryResponse,
  TemplateRemoveMutationResponse,
  templatesTotalCount
} from '../type';
import { Alert, confirm, withProps, router } from '@erxes/ui/src/utils';
import { generatePaginationParams } from '@erxes/ui/src/utils/router';

type Props = {
  queryParams: any;
  currentTemplateId?: string;
  loading: boolean;
  type: string;
  history: any;
  refetcQureies?: any;
};

type FinalProps = {
  templatesQuery: TemplateItemQueryResponse;
  templatesTotalCount: templatesTotalCount;
} & Props &
  TemplateRemoveMutationResponse;

type State = {
  loading: boolean;
};

class ListContainer extends React.Component<FinalProps, State> {
  constructor(props: FinalProps) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const {
      templatesQuery,
      removeTemplateMutation,
      history,
      templatesTotalCount
    } = this.props;

    const templates = templatesQuery.templates || [];

    if (templatesQuery.loading) {
      return <Spinner />;
    }

    const remove = id => {
      confirm().then(() => {
        removeTemplateMutation({
          variables: { _id: id }
        })
          .then(() => {
            Alert.success('You successfully deleted a Template.');

            if (localStorage.getItem('erxes_recent_TemplateLibrary') === id) {
              localStorage.setItem('erxes_recent_Templatelibrary', '');
            }
          })
          .catch(error => {
            Alert.error(error.message);
          });
      });
    };

    const currentType = router.getParam(history, 'type');
    const searchValue = this.props.queryParams.searchValue || '';

    const extendedProps = {
      ...this.props,
      templates: templates,
      searchValue,
      removeTemplate: remove,
      loading: templatesQuery.loading || this.state.loading,
      totalCount: templatesTotalCount.templatesTotalCount || 0,
      currentType
    };

    return <TemplateList {...extendedProps} />;
  }
}

const generateOptions = () => ({
  refetchQueries: ['templatesQuery']
});

const templateListParams = queryParams => ({
  ...generatePaginationParams(queryParams),
  contentType: queryParams.type || 'cards:deal',
  searchValue: queryParams.searchValue
});

export default withProps<FinalProps>(
  compose(
    graphql<
      Props,
      TemplateItemQueryResponse,
      { contentType: string; searchValue: string }
    >(gql(queries.templates), {
      name: 'templatesQuery',
      options: ({ queryParams }: { queryParams: any }) => ({
        fetchPolicy: 'network-only',
        variables: templateListParams(queryParams)
      })
    }),

    graphql<Props, TemplateRemoveMutationResponse>(
      gql(mutations.TemplateDelete),
      {
        name: 'removeTemplateMutation',
        options: generateOptions
      }
    ),
    compose(
      graphql<Props, templatesTotalCount>(gql(queries.templatesTotalCount), {
        name: 'templatesTotalCount',
        options: ({ queryParams }) => ({
          fetchPolicy: 'network-only',
          variables: templateListParams(queryParams)
        })
      })
    )
  )(ListContainer)
);
