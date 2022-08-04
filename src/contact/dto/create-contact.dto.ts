import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum } from "class-validator";

export class CreateContactDto {
  @ApiProperty({ description: "First Name" })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ description: "Last Name" })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ description: "Email" })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "Mobile" })
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ description: "Role" })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ description: "Application Type" })
  @IsString()
  @IsNotEmpty()
  application_type: string;

}


