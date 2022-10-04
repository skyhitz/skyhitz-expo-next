import { ConfigInterface } from "./config";
import { ProductionConfig } from "./config.production";
import { StagingConfig } from "./config.staging";
import { DevelopmentConfig } from "./config.development";

const testingModeOn = process.env.NEXT_PUBLIC_EXPO_SKYHITZ_ENV === "test";

const testingStagingModeOn =
  process.env.NEXT_PUBLIC_EXPO_SKYHITZ_ENV === "development";

const prodModeOn = process.env.NEXT_PUBLIC_EXPO_SKYHITZ_ENV === "production";

let config: ConfigInterface = DevelopmentConfig;

if (testingModeOn) {
  config = DevelopmentConfig;
}

if (testingStagingModeOn) {
  config = StagingConfig;
}

if (prodModeOn) {
  config = ProductionConfig;
}

console.log("Env:", process.env.NEXT_PUBLIC_EXPO_SKYHITZ_ENV);

export const Config = config;
