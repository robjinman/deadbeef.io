import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import { AuthMiddleware, IdentityService } from './api.service';

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

@NgModule({
  providers: [
    { // TODO: Is this necessary?
      provide: AuthMiddleware,
      useFactory: (identityService: IdentityService) => {
        return new AuthMiddleware(identityService);
      },
      deps: [IdentityService]
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink, authMiddleware: AuthMiddleware) => {
        return {
          link: authMiddleware.concat(httpLink.create({ uri: apiUrl() })),
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink, AuthMiddleware],
    },
  ],
})
export class GraphQLModule {}
