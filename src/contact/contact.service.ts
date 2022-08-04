import { Model, Types } from "mongoose";
import { Injectable, Inject, HttpService, BadRequestException, InternalServerErrorException, Logger } from "@nestjs/common";
import { Contact } from "./interfaces/contact.interface";
import { QueryOptions, QueryParameters, Util } from "../utils/Util";
import { SearchColumns, SortColumns } from "../utils/contact.searchColumns";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { CreateContactDto } from "./dto/create-contact.dto";

let util: Util;

@Injectable()
export class ContactService {
  constructor(
    @Inject("CONTACT_MODEL")
    private model: Model<Contact>,
  ) {
    util = new Util();
  }

  async healthCheck() {
    return "Success"
  }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const profile: Contact = await this.model.create(createContactDto);
    return profile;
  }

  async findAll(query: QueryOptions) {
    const pageOptions: QueryParameters = util.getPageOptions(query);
    const result = await this.model.find().skip(pageOptions.offset).limit(pageOptions.limit).sort({ timestamp: -1 }).exec();

    if(!result) {
      return null;
    }
    return {
      data: result,
      offset: pageOptions.offset,
      limit: pageOptions.limit
    }
  }

  async findOne(id: string): Promise<Contact> {
    let profile = await this.model
        .findById(id)
        .exec();

    return profile;
  }

  async getContactById(id: string, _id: string = null): Promise<Contact> {
      return await this.model.findById(id).exec();
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    let profile: any = null;

    profile = await this.model.findByIdAndUpdate(id, updateContactDto, {new: true}).exec();
    return profile;
  }

  async delete(id: string): Promise<Contact> {
    const isDelete = await this.model.findByIdAndDelete(id).exec();
    return isDelete;
  }

}
