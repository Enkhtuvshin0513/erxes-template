export const types = `

  type Template {
    _id: String!
    name: String
    contentType: String
    content: JSON

  }
  
  type TemplateHistoryList {
    list: [Template]
    count: Int
  }
`;

export const queries = `
  templates(contentType: String, searchValue: String, page: Int, perPage: Int): [Template]
  templatesTotalCount (contentType : String, searchValue: String): Int
  templateGetService: JSON
  TemplateHistories(perPage: Int, page: Int, type:String) : TemplateHistoryList
`;

const params = `
  name: String!,
  contenType: String!,
  content: JSON!,
`;

export const mutations = `
  templatesAdd(${params}): Template
  templateDelete(_id: String!): JSON
`;
