import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareBuilder } from '@nestjs/core';
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
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailProcessor],
})
export class AppModule {
  constructor(@InjectQueue('mail-queue') private queue: Queue) {}
  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.queue)]);
    consumer.apply(router).forRoutes('/admin/queue');
  }
}
