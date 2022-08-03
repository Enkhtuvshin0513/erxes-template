import { requireLogin } from '@erxes/api-utils/src/permissions';

import { Templates } from '../models/models';

const templateQueries = {
  templates(_root, { contentType }) {
    const selector = {} as any;

    if (contentType) {
      selector.contentType = contentType;
    }

    return Templates.find(selector);
  },

  templatesTotalCount(_root, _args) {
    return Templates.find({}).countDocuments();
  }
};

requireLogin(templateQueries, 'templates');
requireLogin(templateQueries, 'templatesTotalCount');

export default templateQueries;
