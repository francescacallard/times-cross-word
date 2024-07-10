export enum HTTPHeadersType {
  ContentType = 'Content-Type',
  Authorization = 'Authorization'
}

export enum HttpContentTypeHeaderValues {
  ApplicationJSON = 'application/json'
}

type HTTPContentTypeHeader = Record<HTTPHeadersType.ContentType, HttpContentTypeHeaderValues>
type HTTPAuthorizationHeader = Record<HTTPHeadersType.Authorization, string>

export type HTTPHeaders = HTTPContentTypeHeader | HTTPAuthorizationHeader

export type FetchParams = Record<string, any>
export type FetchBody = Record<string, any>

export enum ApiRouteNames {
  GetArticleIndex = 'getArticleIndex',
  GetArticleReferrers = 'getArticleReferrers',
  GetEngagement = 'getEngagement',
}

export enum ApiRoutePaths {
  ReportArticleIndex = '/report/article-index',
  ReportReferrers = '/report/referrers',
  ReportEngagement = '/report/engagement'
}

export interface FetchArgsType {
  body?: FetchBody
  urlParams?: FetchParams
  queryParams?: FetchParams
}

export interface ReplaceUrlArgsType {
  url: string
  urlParams?: FetchParams
}

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export interface ApiRoute {
  url: ApiRoutePaths
  method: HTTPMethods,
  headers: HTTPHeaders
}

export type ApiRoutesType = Record<string, ApiRoute>

export type WrappedApiCallback = (args?: FetchArgsType) => Promise<any>