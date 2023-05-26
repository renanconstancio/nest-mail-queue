import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('upload-queue')
export class UploadProcessor {
  @Process('upload-resolve')
  async handleUpload(job: Job<string>) {
    console.log('handleUpload');
    console.log(job.data);
    // return;
  }
}
