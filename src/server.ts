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

const app = new Application();
const router = getRoutes();

app.use(errorMiddleware());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFoundHandler);

const port = 3100;
console.log(`Server started on port ${port}`);
await app.listen({ port });
