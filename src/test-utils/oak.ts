import { Application, Context } from "https://deno.land/x/oak/mod.ts";

export const createContext = (): Context => {
  const app: Application = {} as any;

  const request = {
    headers: new Headers(),
    method: "GET",
    url: "/",
    proto: "HTTP/1.1",
    async respond() {},
  } as any;

  return new Context(app, request);
};
