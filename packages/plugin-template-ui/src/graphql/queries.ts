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

const totalCount = `
  query templatesTotalCountQuery {
    templatesTotalCount
  }
`;

const templateGetService = `
  query templateGetService {
    templateGetService
  }
`;

export default {
  templates,
  totalCount,
  templateGetService
};
