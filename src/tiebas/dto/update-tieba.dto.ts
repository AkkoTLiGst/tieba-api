import { PartialType } from '@nestjs/mapped-types';
import { CreateTiebaDto } from './create-tieba.dto';

export class UpdateTiebaDto extends PartialType(CreateTiebaDto) {}
