import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        example: 'noa',
        type: String
    })
    // 用户名
    userId: string;

    @ApiProperty({
        example: '诺亚',
        type: String
    })
    // 昵称
    userName: string;

    @ApiProperty({
        example: '123',
        type: String
    })
    // 密码
    password: string;

    @ApiProperty({
        example: '123@qq.com',
        type: String
    })
    // 邮箱
    email: string;
    
    @ApiProperty({
        example: '17548541256',
        type: String
    })
    // 手机号
    mobile: string;

    
}

