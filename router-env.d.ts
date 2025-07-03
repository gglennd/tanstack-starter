import type { createRouter } from "@tanstack/react-router";

declare module "@tanstack/react-router" {
  type Register = {
    router: ReturnType<typeof createRouter>;
  };
}
