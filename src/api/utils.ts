import { ReplaceUrlArgsType } from 'api/types'

export const replaceUrlParams = ({ url, urlParams }: ReplaceUrlArgsType): string =>
  urlParams
    ? Object.keys(urlParams).reduce((result, paramKey) =>
      result.replace(`:${paramKey}`, urlParams[paramKey]), url)
    : url