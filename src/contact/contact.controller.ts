import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Delete,
  Body,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  UseFilters,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { ContactService } from "./contact.service";
import { ApiResponse, ApiQuery } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../helper/http-exception.filter";
import { Contact } from "./interfaces/contact.interface";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";

@Controller("contact")
export class ContactController {
  constructor(
    private readonly ContactService: ContactService
  ) {}

  @Get("health-check")
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server Error",
  })
  async getHealthCheck() {
    const message = await this.ContactService.healthCheck()
    let result: object = {
      status: HttpStatus.OK,
      data: {
        state: true,
        message: message,
        description: ["Health Check Success"],
      },
    };
    return result;
  }

  @Post()
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

  @Get("all")
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server Error",
  })
  public async index(@Query() query) {
    let results: any = await this.ContactService.findAll(query);
    let result: object = {
      status: HttpStatus.OK,
      data: {
        results: results,
      },
    };
    return result;
  }

  @Get(":id")
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Data Not Available",
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server Error",
  })
  async find(@Param("id") id: string) {
    let profile: any = await this.ContactService.findOne(id);
    let result: object = {
      status: HttpStatus.OK,
      data: {
        profile: profile,
      },
    };

    if (profile == null || Object.keys(profile).length == 0) {
      let msg: string = "Data not available";
      let error: string = "Bad Request";
      result = {
        status: HttpStatus.NOT_FOUND,
        data: {
          message: error,
          description: [msg],
        },
      };
    }

    return result;
  }

  @Put(":id")
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server Error",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param("id") id: string,
    @Body() updateContactDto: UpdateContactDto
  ) {
    let profile: any = await this.ContactService.update(id, updateContactDto);
    let result: object = {
      status: HttpStatus.OK,
      data: {
        message: "Success",
        description: ["Successfully updated!"],
      },
    };
    if (profile == null) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        data: {
          message: "Bad Request",
          description: ["Bad Request"],
        },
      };
    }
    return result;
  }

  @Delete(":id")
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Available" })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server Error",
  })
  async delete(@Param("id") id: string) {
    let profile: any = await this.ContactService.delete(id);
    let result: object = {
      status: HttpStatus.BAD_REQUEST,
      data: {
        message: "Bad Request",
        description: ["Record not available."],
      },
    };

    if (profile != null) {
      result = {
        status: HttpStatus.OK,
        data: {
          message: "Success",
          description: ["Successfuly deleted!"],
        },
      };
    }
    return result;
  }
 
}
