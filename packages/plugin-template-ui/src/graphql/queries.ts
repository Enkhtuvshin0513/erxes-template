const templatesTotalCount = `
  query templatesTotalCount($contentType: String, $searchValue: String) {
    templatesTotalCount(contentType : $contentType, searchValue: $searchValue)
  }
`;

const templateGetService = `
  query templateGetService {
    templateGetService
  }
`;

const listParamsDef = `
  $contentType: String
  $searchValue: String
  $page: Int
  $perPage: Int
`;

const listParamsValue = `
  contentType: $contentType
  searchValue: $searchValue
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
