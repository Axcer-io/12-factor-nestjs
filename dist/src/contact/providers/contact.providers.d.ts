import { Connection } from "mongoose";
export declare const ContactProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("mongoose").Document<any, any, any>, any, any>;
    inject: string[];
}[];
