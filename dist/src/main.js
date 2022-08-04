"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    let env = process.env.ENV;
    let _port = config.get(env)["port"];
    let port = _port ? _port : process.env.port;
    app.useGlobalPipes(new common_1.ValidationPipe());
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    const serverUrl = true ? '/dev' : '/';
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle("Contact Microservice")
        .setDescription("Contact Microservice")
        .setVersion("1.0")
        .addTag("Contact")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup("api", app, document);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map