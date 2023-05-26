import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareBuilder } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express/multer';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { MailController } from './mail/mail.controller';
import { MailModule } from './mail/mail.module';
import { MailProcessor } from './mail/mail.processor';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      }),
    }),
    BullModule.registerQueueAsync(
      {
        name: 'mail-queue',
      },
      {
        name: 'upload-queue',
      },
    ),
    MailModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(
    @InjectQueue('mail-queue') private mailQueue: Queue,
    @InjectQueue('upload-queue') private uploadQueue: Queue,
  ) {}
  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([
      new BullAdapter(this.mailQueue),
      new BullAdapter(this.uploadQueue),
    ]);
    consumer.apply(router).forRoutes('/admin/queue');
  }
}
