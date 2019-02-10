import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './heroes/hero.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({ typePaths: ['./**/*.graphql'], installSubscriptionHandlers: true}),
    HeroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
