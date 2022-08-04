import { Model } from "mongoose";
import { Contact } from "./interfaces/contact.interface";
import { CreateContactDto } from "./dto/create-contact.dto";
export declare class ContactService {
    private model;
    constructor(model: Model<Contact>);
    create(createContactDto: CreateContactDto): Promise<String>;
    getContactById(id: string, _id?: string): Promise<Contact>;
}
