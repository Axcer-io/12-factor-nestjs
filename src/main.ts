import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { useContainer } from "class-validator";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  let _port: number = config.get<number>(process.env.ENV)["port"];
  let port = _port ? _port : process.env.port;

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const serverUrl = true ? "/dev" : "/";
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Contact Microservice")
    .setVersion("1.0")
    .addTag("Contact")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
}
bootstrap();
