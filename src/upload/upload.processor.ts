import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('upload-queue')
export class UploadProcessor {
  @Process('upload-resolve')
  async handleUpload(job: Job) {
    console.log('TESTE');
    // console.log(job.data.file.buffer.toString());
    // return;
  }
}
