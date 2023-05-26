import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Queue } from 'bull';
import { CreateUploadDto } from './create-upload.tdo';

@Controller('upload')
export class UploadController {
  constructor(
    @InjectQueue('upload-queue') private readonly uploadQueue: Queue,
  ) {}

  // @UseInterceptors(FileInterceptor('file'))
  // async handelUpdload(@UploadedFile() file: Express.Multer.File) {
  @Post()
  async handelUpdload(@Body() file: CreateUploadDto) {
    await this.uploadQueue.add('upload-resolve', file, {
      attempts: 1,
    });

    return { asdf: 'asdf' };
  }
}
