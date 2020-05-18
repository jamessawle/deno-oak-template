import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { errorMiddleware } from "./middleware/errorMiddleware.ts";
import { notFoundHandler } from "./handlers/notFoundHandler.ts";

const getRoutes = () => {
  const router = new Router();
  router.get("/hello", ({ response }) => {
    response.body = { message: "Hello world!" };
  });
  return router;
};

const host = Deno.env.get('HOST') || '127.0.0.1';
const port = Deno.env.get('PORT') || 8080;

const app = new Application();
const router = getRoutes();

app.use(errorMiddleware());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFoundHandler);

console.log(`Server started on port ${port}`);
await app.listen(`${host}:${port}`);
