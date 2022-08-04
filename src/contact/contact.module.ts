import { HttpModule, Module } from "@nestjs/common";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { ContactProviders } from "./providers/contact.providers";
import { DatabaseModule } from "../databse.module";
// import { Validator } from "../helper/contact.validator";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [ContactController],
  providers: [
    ConfigService,
    ContactService,
    ...ContactProviders,
  ],
})
export class ContactModule {}
