import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Delete,
  Body,
  Request,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  UseFilters,
} from "@nestjs/common";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";

import { ApiResponse, ApiQuery } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../helper/http-exception.filter";

@Controller("contact")
export class ContactController {
  constructor(private readonly ContactService: ContactService) {}

  @Post('web')
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server Error",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createweb(@Body() createContactDto: CreateContactDto) {
    let response: any = await this.ContactService.create(createContactDto);
    const result: object = {
      status: HttpStatus.OK,
      data: response,
    };
    return result;
  }

  @Post('blockchain')
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server Error",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createBlockchain(@Body() createContactDto: CreateContactDto) {
    let response: any = await this.ContactService.create(createContactDto);
    const result: object = {
      status: HttpStatus.OK,
      data: response,
    };
    return result;
  }

  // @Get("all")
  // @UseFilters(new HttpExceptionFilter())
  // @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: "Internal Server Error",
  // })
  // public async index() {
  //   let results: any = await this.ContactService.findAll();
  //   let result: object = {
  //     status: HttpStatus.OK,
  //     data: {
  //       results: results,
  //     },
  //   };
  //   return result;
  // }

  // @Get(":id")
  // @UseFilters(new HttpExceptionFilter())
  // @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: "Data Not Available",
  // })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: "Internal Server Error",
  // })
  // async find(@Param("id") id: string) {
  //   let contact: any = await this.ContactService.findOne(id);
  //   let result: object = {
  //     status: HttpStatus.OK,
  //     data: {
  //       contact: contact,
  //     },
  //   };

  //   if (contact == null || Object.keys(contact).length == 0) {
  //     let msg: string = "Data not available";
  //     let error: string = "Bad Request";
  //     result = {
  //       status: HttpStatus.NOT_FOUND,
  //       data: {
  //         message: error,
  //         description: [msg],
  //       },
  //     };
  //   }

  //   return result;
  // }

  // @Put(":id")
  // @UseFilters(new HttpExceptionFilter())
  // @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: "Internal Server Error",
  // })
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async update(
  //   @Param("id") id: string,
  //   @Body() updateContactDto: UpdateContactDto
  // ) {
  //   let contact: any = await this.ContactService.update(id, updateContactDto);
  //   let result: object = {
  //     status: HttpStatus.OK,
  //     data: {
  //       message: "Success",
  //       description: ["Successfully updated!"],
  //     },
  //   };
  //   if (contact == null) {
  //     result = {
  //       status: HttpStatus.BAD_REQUEST,
  //       data: {
  //         message: "Bad Request",
  //         description: ["Bad Request"],
  //       },
  //     };
  //   }
  //   return result;
  // }

  // @Delete(":id")
  // @UseFilters(new HttpExceptionFilter())
  // @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Available" })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: "Internal Server Error",
  // })
  // async delete(@Param("id") id: string) {
  //   let contact: any = await this.ContactService.delete(id);
  //   let result: object = {
  //     status: HttpStatus.BAD_REQUEST,
  //     data: {
  //       message: "Bad Request",
  //       description: ["Record not available."],
  //     },
  //   };

  //   if (contact != null) {
  //     result = {
  //       status: HttpStatus.OK,
  //       data: {
  //         message: "Success",
  //         description: ["Successfuly deleted!"],
  //       },
  //     };
  //   }
  //   return result;
  // }

  // @Post("bulk/delete")
  // @UseFilters(new HttpExceptionFilter())
  // @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: "Internal Server Error",
  // })
  // async bulkDelete(@Body() ids: any) {
  //   let result: object = {
  //     status: HttpStatus.BAD_REQUEST,
  //     data: {
  //       message: "Bad Request",
  //       description: ["Ids are cannot empty!"],
  //     },
  //   };

  //   if (Object.keys(ids).length > 0) {
  //     await this.ContactService.deleteBulk(ids);
  //     result = {
  //       status: HttpStatus.OK,
  //       data: {
  //         message: "Success",
  //         description: ["Successfuly deleted!"],
  //       },
  //     };
  //   }

  //   return result;
  // }

  // @Get("advance/search")
  // @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: "Internal Server Error",
  // })
  // @ApiQuery({
  //   name: "limit",
  //   required: false,
  //   explode: false,
  //   type: Number,
  //   description: "Limit of collection items to return, min 1, max 200",
  // })
  // @ApiQuery({
  //   name: "offset",
  //   required: false,
  //   explode: false,
  //   type: Number,
  //   description: "Offset of collection list, Default value: 0",
  // })
  // @ApiQuery({
  //   name: "sort",
  //   required: false,
  //   explode: false,
  //   type: String,
  //   description:
  //     "Determine which fields should be use for sort. Available fileds contactId, contactName, department, description, state, cryptoId Ex: sort=productId=-1&chipMakerId=-1, Note : (1 = asc, (-1) = desc)",
  // })
  // @ApiQuery({
  //   name: "name",
  //   required: false,
  //   explode: false,
  //   type: String,
  //   description:
  //     "Determine which Name should be included in response. This is contains search.",
  // })
  // @ApiQuery({
  //   name: "hospitalName",
  //   required: false,
  //   explode: false,
  //   type: String,
  //   description:
  //     "Determine which Hospital Name should be included in response. This is contains search.",
  // })
  // @ApiQuery({
  //   name: "contactNumber",
  //   required: false,
  //   explode: false,
  //   type: String,
  //   description:
  //     "Determine which Contact Number should be included in response. This is contains search.",
  // })
  // @ApiQuery({
  //   name: "email",
  //   required: false,
  //   explode: false,
  //   type: String,
  //   description:
  //     "Determine which Email should be included in response. This is contains search.",
  // })
  // @ApiQuery({
  //   name: "status",
  //   required: false,
  //   explode: false,
  //   type: String,
  //   description:
  //     "Determine which status should be included in response. This is contains search.",
  // })
  // async advanceSearch(@Query() query) {
  //   let results: any = await this.ContactService.advanceSearch(query);
  //   let result: object = {
  //     status: HttpStatus.OK,
  //     total: results.totalCount,
  //     data: {
  //       results: results.data,
  //     },
  //   };

  //   return result;
  // }

}
