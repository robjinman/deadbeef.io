import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { environment } from 'src/environments/environment';

const buildType = environment.buildType;

function apiUrl(): string {
  if (buildType == "development") {
    return "http://localhost:4000";
  }
  else if (buildType == "staging") {
    return "http://localhost/api"
  }
  else if (buildType == "production") {
    return "http://deadbeef.io/api"; // TODO: https
  }
  return "http://localhost:4000";
}

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri: apiUrl() }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
