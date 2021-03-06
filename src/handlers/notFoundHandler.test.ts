import { notFoundHandler } from "./notFoundHandler.ts";
import { createContext } from "../test-utils/oak.ts";
import { createHttpError } from "oak/httpError.ts";
import {
  AssertionError,
  assertEquals,
} from "std/testing/asserts.ts";

Deno.test("notFoundHandler should throw 404", async () => {
  const context = createContext();
  const next: () => Promise<void> = () => Promise.resolve();
  const expectedError = createHttpError(404, "Route not found");

  try {
    notFoundHandler(context, next);
    throw new AssertionError("404 error should have been thrown");
  } catch (error) {
    assertEquals(error, expectedError);
  }
});
