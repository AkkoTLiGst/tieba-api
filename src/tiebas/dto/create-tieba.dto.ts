import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTiebaDto {
    // 吧名
    @IsNotEmpty()
    tiebaName: string;

    // 简介
    aboutTieba: string;

    // 关注
    @IsNumber(null, {message: '必须为数值'})
    subscribeTieba: number;
}
