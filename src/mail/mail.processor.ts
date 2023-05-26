import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateMailDto } from './create-mail.dto';

@Processor('mail-queue')
export class MailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process('mail-resolve')
  async handleSendMail(job: Job<CreateMailDto>) {
    console.log('Passou');

    const { email, name } = job.data;

    await this.mailerService.sendMail({
      to: email, // list of receivers
      from: 'Boas Vindas! <noreply@nestjs.com>', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: `<b>welcome ${name}</b>`, // HTML body content
    });
  }
}
