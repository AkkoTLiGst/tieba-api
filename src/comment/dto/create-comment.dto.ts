import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({
        example: '这是评论内容',
        type: String
    })
    comment: string; // 评论内容

    @ApiProperty({
        example: 2,
        type: Number
    })
    floor: number; // 楼层数

    @ApiProperty({
        example: 1,
        type: Number
    })
    userId: number; // 创建者id

    @ApiProperty({
        example: 1,
        type: Number
    })
    tieziId: number; // 帖子的id
}
