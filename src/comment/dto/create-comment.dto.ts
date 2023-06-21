export class CreateCommentDto {
    comment: string; // 评论内容

    floor: number; // 楼层数

    userId: number; // 创建者id

    tieziId: number; // 帖子的id
}
