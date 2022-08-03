const Templateadd = `
  mutation templatesAdd($name: String!, $content: JSON, $contentType!: String!) {
    templatesAdd(name: $name, content: $content, contentType: $contentType) {
      _id
    }
  }
`;

const TemplateDelete = `
	mutation templateDelete($_id: String!) {
		templateDelete(_id: $_id)
	}
`;

export default {
  Templateadd,
  TemplateDelete
};
