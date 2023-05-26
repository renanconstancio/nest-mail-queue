import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareBuilder } from '@nestjs/core';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { UploadController } from './upload.controlle';
import { UploadProcessor } from './upload.processor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.registerQueue({ name: 'upload-queue' }),
  ],
  controllers: [UploadController],
  providers: [UploadProcessor],
})
export class UploadModule {
  constructor(@InjectQueue('upload-queue') private queue: Queue) {}
  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.queue)]);
    consumer.apply(router).forRoutes('/admin/upload');
  }
}
