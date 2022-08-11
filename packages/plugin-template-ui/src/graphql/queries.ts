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

const listParamsDef = `
  $contentType: String
  $page: Int
  $perPage: Int
`;

const listParamsValue = `
  contentType: $contentType
  page: $page
  perPage: $perPage
`;

const templates = `
  query templatesQuery(${listParamsDef}) {
    templates(${listParamsValue}) {
      _id
      name
      content
      contentType
    }
  }
`;

export default {
  templates,
  templatesTotalCount,
  templateGetService,
  listParamsDef,
  listParamsValue
};
