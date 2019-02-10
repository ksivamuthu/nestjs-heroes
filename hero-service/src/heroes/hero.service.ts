import { Injectable } from '@nestjs/common';
import { Hero } from './hero.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HeroService {

    constructor(@InjectRepository(Hero) private readonly heroRepository: Repository<Hero>) {

    }

    public getHeroes(): Promise<Hero[]> {
      return this.heroRepository.find();
    }

    public getHero(id: number): Promise<Hero> {
      return this.heroRepository.findOneOrFail({where: { id }});
    }

    public createHero(hero: Hero): Promise<Hero> {
       return this.heroRepository.save(hero);
    }

    public async deleteHero(id: number): Promise<boolean> {
        const existing = await  this.heroRepository.findOneOrFail({where: {id }});
        if (existing) {
            await this.heroRepository.remove(existing);
            return true;
        }
        return false;
    }

    public async updateHero(id: number, hero: Hero): Promise<Hero> {
        const existing = await  this.heroRepository.findOneOrFail({where: {id }});
        if (existing) {
            return this.heroRepository.save({ ...existing, ...hero });
        }
    }
}
