import { Middleware } from "oak";

export const notFoundHandler: Middleware = (ctx) => {
  ctx.throw(404, "Route not found");
};
