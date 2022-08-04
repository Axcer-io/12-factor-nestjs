"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactProviders = void 0;
const contact_schema_1 = require("../schemas/contact.schema");
exports.ContactProviders = [
    {
        provide: "CONTACT_MODEL",
        useFactory: (connection) => connection.model("Contact", contact_schema_1.ContactSchema),
        inject: ["DATABASE_CONNECTION"],
    },
];
//# sourceMappingURL=contact.providers.js.map