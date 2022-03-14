import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import withCurrentUser from '@erxes/ui/src/auth/containers/withCurrentUser';
import { IUser } from '@erxes/ui/src/auth/types';
import { Alert, withProps } from '@erxes/ui/src/utils';
import { ICustomer } from '@erxes/ui/src/customers/types';
import { AddMutationResponse, IEngageMessageDoc } from '../types';
import { queries as templatesQuery } from '@erxes/ui-settings/src/emailTemplates/graphql';
import React from 'react';
import { graphql } from 'react-apollo';
import { BrandsQueryResponse } from '@erxes/ui/src/brands/types';
import { EmailTemplatesQueryResponse } from '@erxes/ui-settings/src/emailTemplates/types';
import Widget from '../components/Widget';
import {
  MESSAGE_KINDS,
  MESSENGER_KINDS,
  METHODS,
  SENT_AS_CHOICES
} from '../constants';
import { mutations, queries } from '../graphql';
import { crudMutationsOptions } from '../utils';

type Props = {
  customers: ICustomer[];
  emptyBulk?: () => void;
  modalTrigger?: React.ReactNode;
  channelType?: string;
  totalCountQuery?: any;
};

type FinalProps = {
  currentUser: IUser;
  emailTemplatesQuery: EmailTemplatesQueryResponse;
  brandsQuery: BrandsQueryResponse;
} & Props &
  AddMutationResponse;

const WidgetContainer = (props: FinalProps) => {
  const {
    currentUser,
    emailTemplatesQuery,
    brandsQuery,
    emptyBulk,
    messagesAddMutation
  } = props;
console.log(emailTemplatesQuery.loading, "email temp")
  if (emailTemplatesQuery.loading || brandsQuery.loading) {
    return null;
  }

  const emailTemplates = emailTemplatesQuery.emailTemplates;
  const brands = brandsQuery.brands;

  // save
  const save = (doc, callback) => {
    doc.kind = MESSAGE_KINDS.MANUAL;
    doc.isLive = true;
    doc.fromUserId = currentUser._id;

    if (doc.method === METHODS.EMAIL && !doc.email.content) {
      return Alert.warning('Please fill in email content');
    }

    if (doc.method === METHODS.MESSENGER && !doc.messenger.content) {
      return Alert.warning('Please fill in message content');
    }

    messagesAddMutation({
      variables: doc
    })
      .then(() => {
        callback();

        Alert.success(`You successfully added a engagement message`);

        if (emptyBulk) {
          emptyBulk();
        }
      })
      .catch(error => {
        Alert.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    emailTemplates,
    brands,
    save,
    messengerKinds: MESSENGER_KINDS.SELECT_OPTIONS,
    sentAsChoices: SENT_AS_CHOICES.SELECT_OPTIONS
  };

  return <Widget {...updatedProps} />;
};

const withQueries = withProps<Props>(
  compose(
    graphql<Props, EmailTemplatesQueryResponse>(
      gql(templatesQuery.emailTemplates),
      {
        name: 'emailTemplatesQuery',
        options: ({ totalCountQuery }) => ({
          variables: {
            perPage: totalCountQuery.emailTemplatesTotalCount
          }
        })
      }
    ),
    graphql<Props, BrandsQueryResponse>(gql(queries.brands), {
      name: 'brandsQuery'
    }),
    graphql<Props, AddMutationResponse, IEngageMessageDoc>(
      gql(mutations.messagesAdd),
      {
        name: 'messagesAddMutation',
        options: crudMutationsOptions
      }
    )
  )(withCurrentUser(WidgetContainer))
);

export default withProps<Props>(
  compose(
    graphql(gql(templatesQuery.totalCount), {
      name: 'totalCountQuery'
    })
  )(withQueries)
);
