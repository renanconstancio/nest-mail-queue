import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';
import { CreateUploadDto } from './create-upload.tdo';

@Controller('upload')
export class UploadController {
  constructor(
    @InjectQueue('upload-queue') private readonly uploadQueue: Queue,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handelUpdload(
    @Body() createUploadDto: CreateUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.uploadQueue.add('upload-resolve', file.buffer.toString());

    return { asdf: 'asdf' };
  }
}
