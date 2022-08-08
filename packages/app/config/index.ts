import { ConfigInterface } from './config'
import { ProductionConfig } from './config.production'
import { StagingConfig } from './config.staging'
import { DevelopmentConfig } from './config.development'

const testingModeOn = process.env.NEXT_PUBLIC_EXPO_SKYHITZ_ENV === 'test'

const testingStagingModeOn =
  process.env.NEXT_PUBLIC_EXPO_SKYHITZ_ENV === 'development'

let config: ConfigInterface = ProductionConfig

if (testingModeOn) {
  config = DevelopmentConfig
}

if (testingStagingModeOn) {
  config = StagingConfig
}

console.log('Env:', process.env.NEXT_PUBLIC_EXPO_SKYHITZ_ENV)

export const Config = config
