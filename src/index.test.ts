import { expect, it, vi } from "vitest";

const { mockDotenvConfig } = vi.hoisted(() => ({
  mockDotenvConfig: vi.fn(),
}));

vi.mock("dotenv-flow", () => ({
  default: { config: mockDotenvConfig },
}));

it("calls dotenvFlow.config with silent option on import", async () => {
  await import("./index");
  expect(mockDotenvConfig).toHaveBeenCalledWith({ silent: true });
});
