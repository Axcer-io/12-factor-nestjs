import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";
import { ContactService } from "../contact/contact.service";
import {Injectable} from '@nestjs/common';

let contactObject:ContactService;
@ValidatorConstraint({ name: 'IsContactAvailable', async: true })
@Injectable()
export class Validator implements ValidatorConstraintInterface {

    constructor(private readonly contactService: ContactService) {
      if (!contactObject) {
        contactObject = this.contactService;
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

export function IsContactAvailable( options?: ValidationOptions) {
    return(o: Object, propertyName: string)=>{
      registerDecorator({
        name: 'IsContactAvailable',
        target: o.constructor,
        propertyName: propertyName,
        options: options,
        validator: Validator,
      });
    }
}
