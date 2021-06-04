import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Contracts1Controller} from './routes/contracts/contracts1/index'
import {AuthzModule} from './authz/authz.module'
@Module({
  imports: [AuthzModule],
  controllers: [AppController, Contracts1Controller],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
