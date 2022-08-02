const Templateadd = `
  mutation templatesAdd($name: String!, $content: JSON, $contentType!: String!) {
    templatesAdd(name: $name, content: $content, contentType: $contentType) {
      _id
    }
  }
`;

export default {
  Templateadd
};
