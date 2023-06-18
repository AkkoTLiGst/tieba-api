export class CreateCommentDto {
    comment: string; // 评论内容

    floor: number; // 楼层数

    userId: string; // 创建者用户名

    tieziId: number; // 帖子的id
}
