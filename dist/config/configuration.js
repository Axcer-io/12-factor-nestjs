"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const yaml = require("js-yaml");
const path_1 = require("path");
const CONFIG_FILE = "env.yaml";
exports.default = () => {
    return yaml.load((0, fs_1.existsSync)((0, path_1.join)(__dirname, CONFIG_FILE))
        ? (0, fs_1.readFileSync)((0, path_1.join)(__dirname, CONFIG_FILE), "utf8")
        : null);
};
//# sourceMappingURL=configuration.js.map