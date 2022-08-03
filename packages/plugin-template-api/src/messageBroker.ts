import { Templates } from './graphql/models/models';

let client;

export const initBroker = async cl => {
  client = cl;

  const { consumeQueue } = client;
  consumeQueue(`template:createTemplate`, async ({ data }) => {
    const doc = {
      name: data.templateName,
      content: data,
      contentType: data.contentType
    };

    return {
      status: 'success',
      data: await Templates.createTemplate(doc)
    };
  });
};

export default function() {
  return client;
}
