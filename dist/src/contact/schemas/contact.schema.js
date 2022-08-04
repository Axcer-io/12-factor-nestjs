"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSchema = void 0;
const mongoose = require("mongoose");
exports.ContactSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    mobile: String,
    role: String,
    application_type: String,
});
//# sourceMappingURL=contact.schema.js.map