import { Middleware, isHttpError } from "oak";

export const errorMiddleware = (): Middleware =>
  async ({ response }, next) => {
    try {
      await next();
    } catch (err) {
      if (!isHttpError(err)) {
        response.status = 500;
        response.body = { status: 500, message: err.message };
        return;
      }

      const { status, message } = err;
      const formattedStatus = status >= 500 ? 500 : status;
      const formattedMessage = formattedStatus === 500
        ? "Something went wrong!"
        : message;
      response.status = formattedStatus.valueOf();
      response.body = { status: formattedStatus, message: formattedMessage };
    }
  };
