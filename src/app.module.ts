import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareBuilder } from '@nestjs/core';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { MailModule } from './mail/mail.module';
import { UploadModule } from './upload/upload.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
        name: 'articles-queue',
      },
      {
        name: 'mail-queue',
      },
      {
        name: 'upload-queue',
      },
    ),
    MailModule,
    UploadModule,
    PrismaModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(
    @InjectQueue('articles-queue') private articleQueue: Queue,
    @InjectQueue('mail-queue') private mailQueue: Queue,
    @InjectQueue('upload-queue') private uploadQueue: Queue,
  ) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([
      new BullAdapter(this.articleQueue),
      new BullAdapter(this.mailQueue),
      new BullAdapter(this.uploadQueue),
    ]);

    consumer.apply(router).forRoutes('/admin/queue');
  }
}
