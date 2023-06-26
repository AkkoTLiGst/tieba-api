import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTiebaDto {
    // 吧名
    @ApiProperty({
        example: '战地1',
        type: String
    })
    @IsNotEmpty()
    tiebaName: string;

    // 简介
    @ApiProperty({
        example: '这是战地1吧',
        type: String
    })
    aboutTieba: string;

    // 关注
    @ApiProperty({
        example: 0,
        type: Number
    })
    @IsNumber(null, {message: '必须为数值'})
    subscribeTieba: number;

}
