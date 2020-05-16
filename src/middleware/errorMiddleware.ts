import { Middleware, isHttpError } from "https://deno.land/x/oak/mod.ts";

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
      const formattedMessage = status === 500 ? "Something went wrong"
      : message;
      response.status = status.valueOf();
      response.body = { status, message: formattedMessage };
    }
  };
