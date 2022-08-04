"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
const config_1 = require("@nestjs/config");
exports.databaseProviders = [
    {
        provide: "DATABASE_CONNECTION",
        inject: [config_1.ConfigService],
        useFactory: (configService) => mongoose.connect((configService.get(`${process.env.ENV}.DB_URI`) ? configService.get(`${process.env.ENV}.DB_URI`) : process.env.DB_URI), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }),
    },
];
//# sourceMappingURL=database.providers.js.map