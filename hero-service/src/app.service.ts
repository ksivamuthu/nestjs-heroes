import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return  { status: 'healthy', uptime: process.uptime() };
  }
}
