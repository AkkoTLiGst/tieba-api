import { Comment } from "src/comment/entities/comment.entity";
import { Tieba } from "src/tiebas/entities/tieba.entity";
import { Tiezi } from "src/tiezi/entities/tiezi.entity";

export const tieziLists: Tiezi[] = []; // 用于保存帖子

export const commentList: Comment[] = []; // 用于保存评论

export const followTiebaList = []; // 用户关注了哪些贴吧的ID