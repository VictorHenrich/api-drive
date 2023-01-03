import { Module, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from 'typeorm';
import UserAuthController from './Controllers/UserAuthController';

;
import DriveController from './Controllers/DriveController';
import UserController from './Controllers/UserController';

import AuthTokenMiddleware from './Middleware/AuthTokenMiddleware';

import User from './Models/User';
import Drives from './Models/Drives';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "banco_entrevista",
      synchronize: true,
      entities: [
        User,
        Drives
      ],
    })
  ],
  controllers: [
    DriveController,
    UserController,
    UserAuthController
  ]
})
export class AppModule {
  constructor(
    private dataSource: DataSource
  ){

  }

  configure(consumer: MiddlewareConsumer){
      consumer
        .apply(AuthTokenMiddleware)
        .exclude(
          {path: "user", method: RequestMethod.POST}
        )
        .forRoutes(UserController);
  }
}
