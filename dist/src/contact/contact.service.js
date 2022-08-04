"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const Util_1 = require("../utils/Util");
const client_ses_1 = require("@aws-sdk/client-ses");
let util;
let sesClient;
let ContactService = class ContactService {
    constructor(model) {
        this.model = model;
        util = new Util_1.Util();
        sesClient = new client_ses_1.SESClient({ region: "us-west-2" });
    }
    async create(createContactDto) {
        const contactPayload = await this.model.create(createContactDto);
        const input = {
            EmailAddress: "nalakatestemail@gmail.com"
        };
        try {
            const verifyEmailPromise = await sesClient.send(new client_ses_1.VerifyEmailAddressCommand(input));
            console.log("Printing Data-----");
            console.log(verifyEmailPromise);
        }
        catch (error) {
            console.log(error);
        }
        return 'Thanks for being awesome! We have received your message and would like to thank you for filling out your information';
    }
    async getContactById(id, _id = null) {
        return await this.model.findById(id).exec();
    }
};
ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("CONTACT_MODEL")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ContactService);
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map