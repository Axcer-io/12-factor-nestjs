import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";
import { ContactService } from "../contact/contact.service";
import {Injectable} from '@nestjs/common';

let contactObject:ContactService;
@ValidatorConstraint({ name: 'IsContactIdAvailable', async: true })
@Injectable()
export class Validator implements ValidatorConstraintInterface {

    constructor(private readonly deviceService: ContactService) {
      if (!contactObject) {
        contactObject = this.deviceService;
      }
    }

    async validate(id: string) {
      try {
        let contact = await contactObject.getContactById(id);
        return !contact;
      } catch (e) {
        return false;
      }
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Contact id allready exits';
    }
}

export function IsContactIdAvailable( options?: ValidationOptions) {
    return(o: Object, propertyName: string)=>{
      registerDecorator({
        name: 'IsContactIdAvailable',
        target: o.constructor,
        propertyName: propertyName,
        options: options,
        validator: Validator,
      });
    }
}