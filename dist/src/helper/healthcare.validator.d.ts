import { ValidatorConstraintInterface, ValidationOptions, ValidationArguments } from "class-validator";
import { ContactService } from "../contact/contact.service";
export declare class Validator implements ValidatorConstraintInterface {
    private readonly deviceService;
    constructor(deviceService: ContactService);
    validate(id: string): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsContactIdAvailable(options?: ValidationOptions): (o: Object, propertyName: string) => void;
