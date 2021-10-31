export const apiSpec = `
openapi: 3.0.3
info:
  title: Programming languages API
  description: >
    This is an **example** API to demonstrate features of the OpenAPI
    specification.
  version: 1.0.0
  contact:
    name: John DOE
    email: john.doe@email.com
    url: 'https://johndoe.com'
  license:
    name: MIT License
    url: 'https://opensource.org/licenses/MIT'
externalDocs:
  description: 'If you are looking for the GraphQL version, checkout this link.'
  url: 'http://localhost:5700/graphql'
servers:
  - url: 'http://localhost:5700/{basePath}'
    description: Local development server
    variables:
      basePath:
        default: api
  - url: 'https://prolang.com/{basePath}'
    description: Production server
    variables:
      basePath:
        default: api
paths:
  /languages/all:
    get:
      operationId: get-all-languages
      summary: Retrieve all languages
      tags:
        - Language
      parameters:
        - $ref: '#/components/parameters/languageFieldsQuery'
      responses:
        '200':
          $ref: '#/components/responses/languageListResponse'
components:
  responses:
    languageListResponse:
      description: List of languages retrieved successfully
      content:
        application/json:
          schema:
            type: object
            properties:
              data:
                type: array
                items:
                  $ref: '#/components/schemas/language'
  schemas:
    yearGroup:
      type: object
      properties:
        id:
          description: Id of the year group
          type: string
          example: 612103bb20aaf1e4d5e84bd4
        name:
          description: Name of the year group
          type: string
          example: 2020s
        position:
          description: Used to order the year group in ascending or descending direction
          type: integer
          example: 1
    language:
      type: object
      properties:
        id:
          type: string
          description: ID of the language
          example: 612103bd20aaf1e4d5e853c0
        company:
          type: string
          nullable: true
          description: Company where the language was created
          example: Oracle
        link:
          type: string
          nullable: true
          description: Link to language biography
          example: 'https://link-to-biography.com/java'
        name:
          type: string
          description: Language's name
          example: Java
        nameExtra:
          type: object
          description: 'Extra information about the language (rfc link, acronym, etc...)'
          properties:
            link:
              type: string
              nullable: true
              example: 'https://link-to-biography.com/java'
            name:
              type: string
              nullable: true
              example: null
        years:
          type: array
          description: Years range of creation of the language
          items:
            type: integer
            minLength: 1
            maxLength: 2
            example: 1995
        yearConfirmed:
          type: boolean
          description: Indicates if the year of creation is confirmed or not
          example: true
        yearGroup:
          $ref: '#/components/schemas/yearGroup'
        authors:
          type: array
          description: Language authors list
          items:
            type: string
        predecessors:
          type: array
          description: Language predecessors Id list
          items:
            type: string
            example: '612103bc20aaf1e4d5e84cc6, 612103bc20aaf1e4d5e84cc6'
  parameters:
    languageFieldsQuery:
      name: fields
      in: query
      required: false
      description: Select specific fields to return in the response
      schema:
        type: string
        format: 'field1,field2,...,fieldn'
        example: 'id,name,company,authors'
        minProperties: 1
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
security:
  - bearerAuth: []
`;
