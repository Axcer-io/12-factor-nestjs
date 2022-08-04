import { Model, Query, Types } from "mongoose";
import { Injectable, Inject, Logger, InternalServerErrorException, BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Contact } from "./interfaces/contact.interface";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { Util } from "../utils/Util";
import { SerachColumns, SortColumns } from "../utils/contact.search.columns";
import { SESClient, SESClientConfig, SendEmailCommand, SendEmailCommandInput, VerifyEmailAddressCommand, VerifyEmailAddressCommandInput } from "@aws-sdk/client-ses"

let util: Util;
let sesClient: SESClient
@Injectable()
export class ContactService {
  constructor(
    @Inject("CONTACT_MODEL")
    private model: Model<Contact>,
  ) {
    util = new Util();
    sesClient = new SESClient({ region: "us-west-2" })
  }

  async create(createContactDto: CreateContactDto): Promise<String> {
    const contactPayload: Contact = await this.model.create(createContactDto);

    const params: SendEmailCommandInput = {
      Source: "tires.manchanayake@gmail.com",
      Destination: {
        ToAddresses: ["knpradeepkumara@gmail.com"],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<head>
            <title>Welcome to Axcer Team</title>
            <style>
                .header {
                    overflow: hidden;
                    background-color: 	#A9A9A9;
                    padding: 10px 55px ;
                }
                .header-right {
                    float: right;
                    background: -webkit-linear-gradient(left, #404040, #080808);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-align: center;
                    padding: 12px;
                    text-decoration: none;
                    font-size: 18px;
                    line-height: 25px;
                    border-radius: 4px;
                }
                .content{
                    text-align: center;
                    padding: 0px;
                }
                .footer{
                    background-color: #f1f1f1;
                    padding: 10px;
                    text-align: center;
                }
                .button {
                    background-color: rgb(0, 195, 255);
                    border: none;
                    border-radius: 5px;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
                }
                .button:hover {
                    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.2);
                    color: #fff;
                    transform: translateY(-2px);
                }
                
            </style>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
        </head>
        <body style="margin-right:25%; margin-left:25%; padding: 0; background-color: #f9f9f9;">
            <div >
                <div class="header">
                    <div class="header-right">
                        <h1>Axcer Team</h1>    
                    </div>
                </div>
    
                <div class="content">
                    <h1>Hello, Smiles Davis,</h1>
                    <p>Welcome to <b>Axcer Team!</b> We're happy to have you on board!.</p>
                    <p>If you have any questions, reach out to us at <a href="">hello@Superpeer.com</a>.</p>
                    <p><a href="#" class="button">Get Started</a></p>
                </div>
    
            </div>
            <div class="footer">
                <p>Have questions or need help? Check out our <a href="">FAQs</a> ,<br> or email us at <a href="">hello@Superpeer.com</a></p>
                <p><a href="">Terms of service</a> and <a href="">Privacy Policy</a></p>
               
                
            </div>
            
        </body>`
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Welcome to Hospital Care Service"
        }
      }
    }

    try {
      const data = await sesClient.send(new SendEmailCommand(params))
      console.log("Printing Data---------")
      console.log(data)
    } catch (error) {
      console.log(error)
    }

    // const input: VerifyEmailAddressCommandInput = {
    //   EmailAddress: "nalakatestemail@gmail.com"
    // }

    // try {
    //   const verifyEmailPromise = await sesClient.send(new VerifyEmailAddressCommand(input))
    //   console.log("Printing Data-----")
    //   console.log(verifyEmailPromise)
    // } catch (error) {
    //   console.log(error)
    // }

    return 'Thanks for being awesome! We have received your message and would like to thank you for filling out your information';
  }

  // async findAll(): Promise<Contact[]> {
  //   return this.model.find().exec();
  // }

  // async findOne(id: string): Promise<Contact> {
  //   let contact = await this.model
  //       .findById(id)
  //       .exec();

  //   return contact;
  // }

  async getContactById(id: string, _id: string = null): Promise<Contact> {
      return await this.model.findById(id).exec();
  }

  // async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
  //   let contact: any = null;

  //   contact = await this.model.findByIdAndUpdate(id, updateContactDto, {new: true}).exec();
  //   return contact;
  // }

  // async delete(id: string): Promise<Contact> {
  //   const isDelete = await this.model.findByIdAndDelete(id).exec();
  //   // if (Types.ObjectId.isValid(id)) {
  //   //   isDelete = await this.model.findByIdAndDelete(id).exec();
  //   // }
  //   return isDelete;
  // }

  // async deleteBulk(ids: any): Promise<any> {
  //   return await this.model.deleteMany({ _id: ids });
  // }

  // async advanceSearch(
  //   query: any
  // ): Promise<{ totalCount: number; data: Contact[] }> {
  //   let pageOptions: any = util.getPageOptions(query);
  //   if (query.offset) {
  //     delete query.offset;
  //   }

  //   if (query.limit) {
  //     delete query.limit;
  //   }

  //   /**
  //    * Searching fields
  //    */
  //   let fltrArr: Object = {};
  //   let sortFltrStr: String = "";
  //   let sortFltrArr: Object = {};
  //   let sortFltr: Object = {};

  //   if (Object.keys(query).length > 0) {
  //     for (let i = 0; i < Object.keys(query).length; i++) {
  //       let key: string = Object.keys(query)[i];
  //       let searchCriteria: string = SerachColumns[key];
  //       if (searchCriteria == "contains") {
  //         fltrArr[key] = { $regex: new RegExp(query[key], "i") };
  //       }

  //       if (searchCriteria == "exact") {
  //         fltrArr[key] = query[key];
  //       }
        
  //       if (key == "sort") {
  //         sortFltrStr = query[key];
  //       }

  //     }

  //     sortFltrArr = sortFltrStr != "" ? sortFltrStr.split("&") : {};
  //     for (let i = 0; i < Object.keys(sortFltrArr).length; i++) {
  //       let colObject: Object = sortFltrArr[i].split("=");
  //       if (Object.keys(colObject).length == 2) {
  //         let key: string = colObject[0];
  //         if (SortColumns[key] && (colObject[1] == -1 || colObject[1] == 1)) {
  //           sortFltr[key] = colObject[1];
  //         }
  //       }
  //     }
  //   }

  //   let contacts: Contact[] = await this.model
  //     .find(fltrArr)
  //     .sort(sortFltr)
  //     .skip(pageOptions.offset)
  //     .limit(pageOptions.limit)
  //     .exec();
  //     let totalCount: number = await this.model.countDocuments(fltrArr).exec();
  //     return { totalCount: totalCount, data: contacts };
  //   }
  
  }

  