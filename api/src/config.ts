export interface AppConfig {
  appSecret: string;
  emailAddress: string;
  emailPassword: string;
}

export function makeConfig(): AppConfig {
  return {
    appSecret: process.env.APP_SECRET || "nosecret",
    emailAddress: process.env.EMAIL_ADDRESS || "",
    emailPassword: process.env.EMAIL_PASSWORD || ""
  }
}
