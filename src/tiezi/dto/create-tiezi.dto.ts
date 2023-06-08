export class CreateTieziDto {
    // 发帖人
    createrId: number;

    // 目标贴吧
    tieBaId: number;

    // 帖子标题
    threadTitle: string;

    // 帖子内容
    content: string;

    // 配图
    tieziImg: string;
}
