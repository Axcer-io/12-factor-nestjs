import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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

}
