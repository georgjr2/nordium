/* eslint-disable no-process-env */
import {isNil, toInteger} from 'lodash'
import dotenv from 'dotenv'
import * as fs from 'fs'


dotenv.config({
  path: process.env.envfile || '.env',
  silent: true,
})

const env = (key, defaultValue) => {
  if (process.env[key] !== undefined) {
    return process.env[key]
  } else if (defaultValue !== undefined) {
    return defaultValue
  } else {
    throw new Error(`Undefined environment variable: ${key}`)
  }
}

const int = (key, defaultValue) => toInteger(env(key, defaultValue))

/* eslint no-unused-vars: 0 */
const bool = (key) => {
  if (process.env[key] === 'true') {
    return true
  } else if (process.env[key] === 'false' || isNil(process.env[key])) {
    return false
  } else {
    throw new Error(`Environment variable "${key}" has invalid value: ${process.env[key]}`)
  }
}

export default {
  server: {
    host: env('host', 'localhost'),
    port: int('port', 5000),
  },
}
