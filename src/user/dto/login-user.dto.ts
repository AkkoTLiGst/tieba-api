import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({
    example: 'userId:Akko',
    type: String
  })
  @IsNotEmpty() username: string;

  @ApiProperty({
    example: '123',
    type: String
  })
  @IsNotEmpty() password: string;
}