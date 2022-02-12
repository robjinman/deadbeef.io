import { Context } from "./context";
import { dispatchEmail } from "./mail";

function composeMessage(username: string,
                        activationLink: string) {
  return `Hi <b>${username}</b>. Click <a href="${activationLink}">here</a> ` +
         `to activate your account.`;
}

export function generateActivationCode() {
  return Math.random().toString(36).substring(2, 10);
}

export function dispatchActivationEmail(context: Context,
                                        userId: number,
                                        username: string,
                                        email: string,
                                        code: string): Promise<void> {
  const link = `https://deadbeef.io/activate` +
               `?user=${userId}&code=${code}`;

  const subject = "deadbeef.io account activation";
  const body = composeMessage(username, link);

  return dispatchEmail(context.config.emailAddress,
                       context.config.emailPassword,
                       email,
                       subject,
                       body);
}
