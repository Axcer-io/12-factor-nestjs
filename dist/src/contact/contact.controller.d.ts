import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";
export declare class ContactController {
    private readonly ContactService;
    constructor(ContactService: ContactService);
    createweb(createContactDto: CreateContactDto): Promise<object>;
    createBlockchain(createContactDto: CreateContactDto): Promise<object>;
}
