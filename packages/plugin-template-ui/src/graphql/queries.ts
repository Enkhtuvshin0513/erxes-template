const templates = `
  query templatesQuery($contentType: String) {
    templates(contentType: $contentType) {
      _id
      name
      content
      contentType
    }
  }
`;

const templatesTotalCount = `
  query templatesTotalCount($contentType: String) {
    templatesTotalCount(contentType : $contentType)
  }
`;

const templateGetService = `
  query templateGetService {
    templateGetService
  }
`;

export default {
  templates,
  templatesTotalCount,
  templateGetService
};
