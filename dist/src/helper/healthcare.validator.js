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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsContactIdAvailable = exports.Validator = void 0;
const class_validator_1 = require("class-validator");
const contact_service_1 = require("../contact/contact.service");
const common_1 = require("@nestjs/common");
let contactObject;
let Validator = class Validator {
    constructor(deviceService) {
        this.deviceService = deviceService;
        if (!contactObject) {
            contactObject = this.deviceService;
        }
    }
    async validate(id) {
        try {
            let contact = await contactObject.getContactById(id);
            return !contact;
        }
        catch (e) {
            return false;
        }
    }
    defaultMessage(args) {
        return 'Contact id allready exits';
    }
};
Validator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsContactIdAvailable', async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], Validator);
exports.Validator = Validator;
function IsContactIdAvailable(options) {
    return (o, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'IsContactIdAvailable',
            target: o.constructor,
            propertyName: propertyName,
            options: options,
            validator: Validator,
        });
    };
}
exports.IsContactIdAvailable = IsContactIdAvailable;
//# sourceMappingURL=healthcare.validator.js.map