import { useURLSearchParam } from "./index";

test("sanity check", () => {
  expect(useURLSearchParam()).toBe(true);
});
