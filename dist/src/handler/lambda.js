"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_serverless_express_1 = require("aws-serverless-express");
const middleware_1 = require("aws-serverless-express/middleware");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("../app.module");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const express = require("express");
const binaryMimeTypes = [];
let cachedServer;
function setupSwagger(app) {
    const config = app.get(config_1.ConfigService);
    let env = (config.get("ENV")) ? config.get("ENV") : process.env.ENV;
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Contact Microservice")
        .setVersion("1.0")
        .addServer(`/${env}`)
        .addTag("Contact")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("api", app, document);
}
async function bootstrapServer() {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
        nestApp.use((0, middleware_1.eventContext)());
        setupSwagger(nestApp);
        await nestApp.init();
        cachedServer = (0, aws_serverless_express_1.createServer)(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
}
const handler = async (event, context) => {
    if (event.path === "/api") {
        event.path = "/api/";
    }
    event.path = event.path.includes("swagger-ui")
        ? `/api${event.path}`
        : event.path;
    cachedServer = await bootstrapServer();
    let response = await (0, aws_serverless_express_1.proxy)(cachedServer, event, context, "PROMISE")
        .promise;
    response["headers"]["Access-Control-Allow-Origin"] = "*";
    return response;
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map