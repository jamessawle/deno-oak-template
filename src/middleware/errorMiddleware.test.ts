import { createContext } from "../test-utils/oak.ts";
import { errorMiddleware } from "./errorMiddleware.ts";
import { assertEquals } from "https://deno.land/std@0.51.0/testing/asserts.ts";
import { createHttpError } from "https://deno.land/x/oak/httpError.ts";
const middleware = errorMiddleware();

Deno.test("Error middleware should return 500 when generic error thrown", () => {
  const errorMessage = "generic error";
  const next = () => {
    throw new Error(errorMessage);
  };
  const context = createContext();
  const expectedErrorBody = { status: 500, message: errorMessage };

  middleware(context, next);

  assertEquals(context.response.status, 500);
  assertEquals(context.response.body, expectedErrorBody);
});

Deno.test("Error middleware should return 500 when 5xx error thrown", () => {
  const next = () => {
    throw createHttpError(502, "Some hidden message");
  };
  const context = createContext();
  const expectedErrorBody = { status: 500, message: "Something went wrong!" };

  middleware(context, next);

  assertEquals(context.response.status, 500);
  assertEquals(context.response.body, expectedErrorBody);
});

Deno.test("Error middleware should return 4xx when 4xx error thrown", () => {
  const status = 412;
  const message = "Some message";
  const next = () => {
    throw createHttpError(status, message);
  };
  const context = createContext();
  const expectedErrorBody = { status, message };

  middleware(context, next);

  assertEquals(context.response.status, status);
  assertEquals(context.response.body, expectedErrorBody);
});
