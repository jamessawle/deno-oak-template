import { Middleware } from "https://deno.land/x/oak/mod.ts";

export const notFoundHandler: Middleware = (ctx) => {
  ctx.throw(404, "Route not found");
};
