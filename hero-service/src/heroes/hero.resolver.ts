import { HeroService } from './hero.service';
import { Hero } from './hero.model';
import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('Hero')
export class HeroResolver {

    constructor(private readonly heroService: HeroService) {}

    @Query()
    async allHeroes(): Promise<Hero[]> {
        return await this.heroService.getHeroes();
    }

    @Query()
    async heroById(@Args('id') id: number): Promise<Hero> {
        return await this.heroService.getHero(id);
    }

    @Mutation()
    async createHero(@Args('hero') hero: Hero): Promise<Hero> {
        const result = await this.heroService.createHero({... new Hero(), ... hero });
        pubSub.publish('heroCreated', { heroCreated: result });
        return result;
    }

    @Mutation()
    async updateHero(@Args('hero')hero: Hero): Promise<Hero> {
        return await this.heroService.updateHero(hero.id, hero);
    }

    @Mutation()
    async deleteHero(@Args('id') heroId: number): Promise<boolean> {
        return await this.heroService.deleteHero(heroId);
    }

    // Don't add async here
    @Subscription('heroCreated')
    heroCreated() {
        return {
            subscribe: () => pubSub.asyncIterator('heroCreated'),
        };
    }
}
