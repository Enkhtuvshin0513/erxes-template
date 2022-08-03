import { requireLogin } from '@erxes/api-utils/src/permissions';
import { ITemplate } from '../models/definitions/template';
import { Templates } from '../models/models';

const templateMutations = {
  /**
   * Creates a new template
   */
  async templatesAdd(_root, doc: ITemplate) {
    const template = await Templates.createTemplate(doc);

    return template;
  },

  async templateDelete(_root, { _id }: { _id: string }) {
    return Templates.deleteOne({ _id });
  }
};

requireLogin(templateMutations, 'templatesAdd');

export default templateMutations;
