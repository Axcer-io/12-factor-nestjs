import * as mongoose from "mongoose";

export const ContactSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  mobile: String,
});
