import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdArrayService } from './id-array.service';

@Controller('id-array')
export class IdArrayController {
  constructor(private readonly idArrayService: IdArrayService) {}
}
