import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './upload.controlle';
import { UploadProcessor } from './upload.processor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.registerQueue({
      name: 'upload-queue',
    }),
  ],
  controllers: [UploadController],
  providers: [UploadProcessor],
})
export class UploadModule {}
