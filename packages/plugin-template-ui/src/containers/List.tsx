import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import { mutations, queries } from '../graphql';
import React from 'react';
import TemplateList from '../components/List';
import { __ } from '@erxes/ui/src/utils';
import { TemplateRemoveMutationResponse } from '../type';
import { Alert, confirm, withProps, router } from '@erxes/ui/src/utils';
import { generatePaginationParams } from '@erxes/ui/src/utils/router';

type Props = {
  queryParams: any;
  loading: boolean;
  type: string;
  contentType: string;
  history: any;
};

type FinalProps = {
  templatesQuery: any;
} & Props &
  TemplateRemoveMutationResponse;

class ListContainer extends React.Component<FinalProps> {
  render() {
    const { templatesQuery, removeTemplateMutation, history } = this.props;

    const templates = templatesQuery.templates || [];

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

    const extendedProps = {
      ...this.props,
      templates,
      removeTemplate: remove,
      currentType
    };

    console.log(templates);

    return <TemplateList {...extendedProps} />;
  }
}

const templateListParams = queryParams => ({
  ...generatePaginationParams(queryParams),
  contentType: queryParams.type || 'customer'
});

export default withProps<FinalProps>(
  compose(
    graphql<Props, any, { contentType: string }>(gql(queries.templates), {
      name: 'templatesQuery',
      options: ({ queryParams }) => ({
        fetchPolicy: 'network-only',
        variables: templateListParams(queryParams)
      })
    }),
    graphql<Props, TemplateRemoveMutationResponse>(
      gql(mutations.TemplateDelete),
      {
        name: 'removeTemplateMutation',
        options: () => ({
          refetchQueries: ['templates']
        })
      }
    )
  )(ListContainer)
);
