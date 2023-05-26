import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUploadDto } from './create-upload.tdo';

@Controller('upload')
export class UploadController {
  constructor(
    @InjectQueue('upload-queue') private readonly uploadQueue: Queue,
  ) {}

  @Post()
  async handelUpdload(@Body() file: CreateUploadDto) {
    await this.uploadQueue.add('upload-resolve', file, {
      attempts: 1,
      delay: 25,
    });

    return { asdf: 'asdf' };
  }
}
