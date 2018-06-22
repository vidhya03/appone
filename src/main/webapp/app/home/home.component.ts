import { Component, OnInit, Inject, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { DOCUMENT } from '@angular/platform-browser';

import { Account, LoginModalService, Principal, LoginService } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ],
    encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit, AfterViewChecked {
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

    ngAfterViewChecked() {
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
