import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ContactModule } from "./contact/contact.module";
import configuration from "../config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ContactModule,
  ],
})
export class AppModule {}
