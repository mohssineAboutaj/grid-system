const config = require("../config");

describe("Testing the config.js file", () => {
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      const el = config[key];
      it("should the key defined", () => {
        expect(key).toBeDefined();
      });
      it("should the el defined", () => {
        expect(config[key]).toBeDefined();
      });
    }
  }
});
