import * as mongoose from "mongoose";
import { ConfigService } from "@nestjs/config";

export const databaseProviders: any = [
  {
    provide: "DATABASE_CONNECTION",
    inject: [ConfigService],
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      new Promise((resolve, reject) => {
        resolve(mongoose.connect(
          configService.get<string>(`${process.env.ENV}.DB_URI`)
            ? configService.get<string>(`${process.env.ENV}.DB_URI`)
            : process.env.DB_URI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
          }
        ))
      })
  },
];
