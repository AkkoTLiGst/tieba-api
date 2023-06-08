import { PartialType } from '@nestjs/mapped-types';
import { CreateTieziDto } from './create-tiezi.dto';

export class UpdateTieziDto extends PartialType(CreateTieziDto) {}
