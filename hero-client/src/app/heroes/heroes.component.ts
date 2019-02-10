import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Hero } from './hero.model';

const fetchQuery =  gql`
{
  allHeroes {
    name
  }
}
`;

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  private heroes: Hero[];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({ query: fetchQuery }).valueChanges.subscribe(result => {
        this.heroes = (result.data as any).allHeroes as Hero[];
    });
  }

  add(id: string, name: string) {
    this.apollo.mutate({ mutation: gql`
      mutation createHero($id: Int!, $name: String!) {
        createHero (hero: {
          id: $id,
          name: $name,
          sayings: ""
        }) {
          id
        }
      }
    `,
    variables: {
      id: parseInt(id, 10),
      name
    },
  refetchQueries: [{
    query: fetchQuery
  }]}).subscribe();
  }
}
