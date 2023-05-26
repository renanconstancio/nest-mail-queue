import { Controller, Get } from '@nestjs/common';

@Controller('upload')
export class UploadController {
  @Get()
  async handelUpdload() {
    return { asdf: 'asdf' };
  }
}
