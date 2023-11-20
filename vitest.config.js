// In summary, this code sets up the configuration for running tests with Vitest. It specifies that before running the tests, the "dotenv/config" module should be executed, likely to load environment variables required for the tests or application setup.

// This function is used to define the configuration for running tests with Vitest.
import { defineConfig } from "vitest/config";

// This configuration is used to customize how Vitest should run tests. 
export default defineConfig({
  test: {
    setupFiles: ["dotenv/config"],
  },
});
