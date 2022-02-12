export interface AppConfig {
  appSecret: string;
}

export function makeConfig(): AppConfig {
  return {
    appSecret: process.env.APP_SECRET || "nosecret"
  }
}
