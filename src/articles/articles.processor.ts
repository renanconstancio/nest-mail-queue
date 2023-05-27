// import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateArticleDto } from './dto/create-article.dto';

@Processor('articles-queue')
export class ArticlesProcessor {
  // constructor(private readonly articleProcessor: MailerService) {}

  @Process('articles-resolve')
  async resolveArticle(job: Job<CreateArticleDto>) {
    console.log('Teste', job);
    // const {} = job.;data;

    // await this.articleProcessor.sendMail({
    //   to: '', // list of receivers
    //   from: 'Boas Vindas! <noreply@nestjs.com>', // sender address
    //   subject: 'Testing Nest MailerModule ✔', // Subject line
    //   text: 'welcome', // plaintext body
    //   html: `<b>welcome ${name}</b>`, // HTML body content
    // });
  }
}
