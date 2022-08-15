import { requireLogin } from '@erxes/api-utils/src/permissions';
import { getServices, getService } from '@erxes/api-utils/src/serviceDiscovery';
import { Templates } from '../models/models';
import { paginate } from '@erxes/api-utils/src/core';

const templateQueries = {
  templates(
    _root,
    {
      contentType,
      searchValue,
      ...args
    }: {
      page: number;
      perPage: number;
      contentType: string;
      searchValue: string;
    }
  ) {
    const selector = {} as any;

    if (contentType) {
      selector.contentType = contentType;
    }

    if (searchValue) {
      selector.name = {
        $in: [new RegExp(`.*${searchValue}.*`, 'i')]
      };
      console.log(searchValue, '11111111111111111111');
    }
    console.log(Templates.find(selector), '22222222222222222222222222');
    const list = paginate(Templates.find(selector), args).sort({
      date: -1
    });

    return list;
  },

  templatesTotalCount(_root, { contentType, searchValue }) {
    const selector = {} as any;

    if (contentType) {
      selector.contentType = contentType;
    }

    if (searchValue) {
      selector.searchValue = searchValue;
    }

    return Templates.find(selector).countDocuments();
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

// requireLogin(templateQueries, "templates");
// requireLogin(templateQueries, "templatesTotalCount");

export default templateQueries;
