import { config } from 'config/config'

const defaultConfig = config.dev
// Use REACT_APP_TARGET_ENV (see Dockerfile)
const env = process.env.REACT_APP_TARGET_ENV || 'dev'

// @ts-ignore
const envConfig = config[env]

const mergedConfig = {
  ...defaultConfig,
  ...envConfig,
}

export default mergedConfig

