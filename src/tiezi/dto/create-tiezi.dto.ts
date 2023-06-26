import { ApiProperty } from "@nestjs/swagger";

export class CreateTieziDto {
    @ApiProperty({
        example: 1,
        type: Number
    })
    // 发帖人
    createrId: number;

    @ApiProperty({
        example: 1,
        type: Number
    })
    // 目标贴吧
    ctieBaId: number;

    @ApiProperty({
        example: '这是标题',
        type: String
    })
    // 帖子标题
    threadTitle: string;

    @ApiProperty({
        example: '这是内容',
        type: String
    })
    // 帖子内容
    content: string;
}
