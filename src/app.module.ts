import { Module } from '@nestjs/common';
import UploadFileController from './Controllers/UploadFileController';

@Module({
  imports: [],
  controllers: [UploadFileController]
})
export class AppModule {}
