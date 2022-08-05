import { requireLogin } from '@erxes/api-utils/src/permissions';
import { getServices, getService } from '@erxes/api-utils/src/serviceDiscovery';
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
  },

  async templateGetService() {
    const services = await getServices();
    const TemplateTypes: Array<{ text: string; contentType: string }> = [];

    for (const serviceName of services) {
      const service = await getService(serviceName, true);
      const meta = service.config?.meta || {};

      if (meta && meta.templates) {
        const types = meta.templates.templateTypes || [];
        for (const type of types) {
          TemplateTypes.push({
            ...type,
            contentType: `${serviceName}:${type.contentType}`
          });
        }
      }
    }

    return TemplateTypes;
  }
};

requireLogin(templateQueries, 'templates');
requireLogin(templateQueries, 'templatesTotalCount');

export default templateQueries;
