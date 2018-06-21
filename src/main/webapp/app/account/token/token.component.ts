import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import { Account, LoginModalService, Principal, LoginService } from '../../shared';
@Component({
    selector: 'jhi-token',
    templateUrl: './token.component.html'
})
export class TokenComponent implements OnInit {
    account: Account;
    error: string;
    success: string;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginService: LoginService,
        private loginModalService: LoginModalService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            console.log('Testing param value is :' + params['accesstoken']);
            this.loginService.loginWithToken(params['accesstoken'], false);
            this.principal.identity().then((account) => {
                this.account = account;
            });
            this.router.navigate(['']);
        });

    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

}
