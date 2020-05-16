import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

const router = new Router();

router.get('/hello', ({response}) => {
  response.body = 'Hello world';
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3100;
console.log(`Server started on port ${port}`)
await app.listen({ port });
