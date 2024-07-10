import axios from 'axios'
import config from 'config'
import { replaceUrlParams } from 'api/utils'
import {
  FetchArgsType,
  ApiRoutesType,
  ApiRouteNames,
  WrappedApiCallback
} from 'api/types'
import ApiRoutes from 'api/api-routes'
import { getTokenFromStorage } from 'utils/local-storage'

export const wrapWithFetch = (apiRoutes: ApiRoutesType): Record<ApiRouteNames, WrappedApiCallback> =>
  Object.keys(apiRoutes).reduce((acc: Record<ApiRouteNames, WrappedApiCallback>, key: string) => {
    acc[key as ApiRouteNames] = async ({ urlParams, body, queryParams }: FetchArgsType = {}) => {
      try {
        const { url, headers, method } = apiRoutes[key]
        const token = getTokenFromStorage()

        // Replace url params
        const replacedUrl = replaceUrlParams({ url, urlParams })

        // Create request object
        const reqParams = {
          data: body,
          url: `${config.api.url}${replacedUrl}`,
          params: queryParams,
          method,
          headers: {
            ...headers,
            Authorization: token
          }
        }

        const response = await axios(reqParams)

        return response.data
      } catch (err) {
        // Throw an error and handle it in the error saga
        throw err
      }
    }

    return acc
  }, {} as Record<ApiRouteNames, WrappedApiCallback>)

export default wrapWithFetch(ApiRoutes)
