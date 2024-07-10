import { useEffect, useState } from 'react'
import config from 'config';

export const getTokenFromStorage = () => {
  const authObject = getAuthObjectFromStorage()
  const token = authObject?.body?.access_token
  const tokenType = authObject?.body?.token_type

  return token ? `${tokenType} ${token}` : ''
}

export const getAuthObjectFromStorage = () => {
  const { clientID, prefix } = config.auth
  const storageKeys = Object.keys(localStorage)
  const searchedKey = storageKeys.find(key => key.includes(`${prefix}${clientID}`))

  return getValueFromStorage(searchedKey, {})
}

export const getValueFromStorage = (key?: string, defaultValue?: any) => {
  if (!key) {
    return defaultValue
  }

  const itemFromStorage = localStorage.getItem(key)
  const parsedValue = itemFromStorage && JSON.parse(itemFromStorage)

  return parsedValue || defaultValue
}
