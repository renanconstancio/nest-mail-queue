import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateMailDto } from './create-mail.dto';

@Controller('mail')
export class MailController {
  constructor(@InjectQueue('mail-queue') private readonly mailQueue: Queue) {}

  @Post()
  async sendMail(@Body() createMailDto: CreateMailDto) {
    await this.mailQueue.add('send-mail', createMailDto, {
      attempts: 3,
      delay: 30,
    });

    return createMailDto;
  }
}
