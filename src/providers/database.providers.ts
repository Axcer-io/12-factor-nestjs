import * as mongoose from "mongoose";
import {ConfigService} from "@nestjs/config";

/**
 *  Currently added hard codded url. will implement @nestjs/config next release.
 */

export const databaseProviders: any = [
  {
    provide: "DATABASE_CONNECTION",
    inject: [ConfigService],
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(
        (configService.get<string>(`${process.env.ENV}.DB_URI`) ? configService.get<string>(`${process.env.ENV}.DB_URI`) : process.env.DB_URI),
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        }
      ),
  },
];
