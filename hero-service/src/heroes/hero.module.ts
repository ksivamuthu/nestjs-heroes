import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './hero.model';
import { HeroResolver } from './hero.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Hero])],
    controllers: [HeroController],
    providers: [HeroService, HeroResolver],
})
export class HeroModule {}
