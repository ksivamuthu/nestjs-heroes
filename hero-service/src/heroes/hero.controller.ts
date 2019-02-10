import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';

/**
 * /api/v1/heroes - Get all heroes
 * /api/v1/heroes - Post - create a hero
 * /api/v1/heroes/:id - Get a hero
 * /api/v1/heroes/:id - Delete a hero
 * /api/v1/heroes/:id - Put - Update a hero
 */

@Controller('heroes')
export class HeroController {

    constructor(private readonly heroService: HeroService) {}

    @Get()
    getHeroes(): Promise<Hero[]> {
       return this.heroService.getHeroes();
    }

    @Get(':id')
    getHeroById(@Param('id', new ParseIntPipe()) id: number): Promise<Hero> {
        return this.heroService.getHero(id);
    }

    @Post()
    createHero(@Body() hero: Hero): Promise<Hero> {
        return this.heroService.createHero(hero);
    }

    @Put(':id')
    updateHero(@Param('id', new ParseIntPipe()) id: number, @Body() hero: Hero): Promise<Hero> {
        return this.heroService.updateHero(id, hero);
    }

    @Delete(':id')
    deleteHero(@Param('id', new ParseIntPipe()) id: number) {
        return this.heroService.deleteHero(id);
    }
}
