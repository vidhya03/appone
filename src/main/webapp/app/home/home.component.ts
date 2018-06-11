import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    jwt: string;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {

        if (this.account.login === 'user') {
            // tslint:disable-next-line:max-line-length
            this.jwt = 'http://localhost:9090/#/token?accesstoken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTU2MDI0MDYzMH0.GcXvLxWDv1sXYn3_vVZKc0iKdNT0d9WOEqO7VZgbOcpyjq52WIbMhWHTfZuqaV8gM8KqUrDOjgreclmV1VX5iQ';
        } else if (this.account.login === 'admin') {
            // tslint:disable-next-line:max-line-length
            this.jwt = 'http://localhost:9090/#/token?accesstoken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU2MDI0MDYzMH0.lgwsG2OFYarsCVQ0thjpe_M-BUp6qlw_gwiIGA1FoDwassDtdNIFgwHIy8E63TZoLPdHKLGvyJXZaZyXP8IZww';
        }
        return this.principal.isAuthenticated();
    }



    login() {
        this.modalRef = this.loginModalService.open();
    }
}
