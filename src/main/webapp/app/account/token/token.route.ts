import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { TokenComponent } from './token.component';

export const tokenRoute: Route = {
    path: 'token',
    component: TokenComponent,
    data: {
        authorities: [],
        pageTitle: 'token.title'
    },
    canActivate: [UserRouteAccessService]

};
