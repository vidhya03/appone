import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { DOCUMENT } from '@angular/platform-browser';

import { Account, LoginModalService, Principal, LoginService } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit, AfterViewInit {
    account: Account;
    modalRef: NgbModalRef;
    jwt: string;
    hostName: string;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private loginService: LoginService,
        private eventManager: JhiEventManager,
        @Inject(DOCUMENT) private document

    ) {
        this.jwt = '';
        this.hostName = window.location.hostname;
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    ngAfterViewInit() {
        //
        // if (this.account !== undefined) {
        //     if (this.account.login === 'user') {
        // tslint:disable-next-line:max-line-length
        //         this.jwt = hostPort + '/#/token?accesstoken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTUyODc5NTQ5Mn0.7OBX0PgbErBcF8rV3MJXDuiVe712XJVcI1O1q4eE7T_dgUTP4Bw66NnTPzZGFkYybYz1ezEm2mUDyVojcdfJiA';
        //     } else if (this.account.login === 'admin') {
        // tslint:disable-next-line:max-line-length
        //         this.jwt = hostPort + '/#/token?accesstoken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUyODc5NTM5MH0.ENN7EP-q9h6r-YcsaTep1x0pvpwf-xuJALO4ME0GqwIWd3pKC7y8sgmyme_00KIAqQOaJWvJAwTHvHFV6ALgNA';
        //     }
        // }
        this.updateJwt();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {

            this.principal.identity().then((account) => {
                this.account = account;
                this.updateJwt();

            });
        });
    }

    private updateJwt() {
        if (this.isAuthenticated() === true) {
            const path = '/#/token?accesstoken=';
            const hostPort = 'http://' + this.hostName + ':9090';
            // const hostPort = 'http://mcgraj02.eur.ad.sag:9090';
            this.jwt = hostPort + path + this.loginService.getToken();
        }
    }

    isAuthenticated() {

        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
