import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  error(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private router: Router, private toastrService: ToastrService) {}

  ShowInfoMessage(message: any) {
    this.toastrService.info(message, 'Info', {
      timeOut: 3000,
    });
  }
  ShowSuccessMessage(message: string, action?: string) {
    this.toastrService.success(message, 'Success', {
      timeOut: 3000,
    });
  }
  ShowWarningMessage(message: any, action?: string) {
    this.toastrService.warning(message, 'Warning', {
      timeOut: 3000,
    });
  }
  ShowErrorMessage(message: any, action?: string) {
    this.toastrService.error(message, 'Error', {
      timeOut: 3000,
      positionClass: "toast-center"
    });
  }

  ShowError(error: any, message: string = 'Failed due to service error') {
    if (
      (error.error && typeof error.error === 'string') ||
      error.error instanceof String
    ) {
      message = error.error;
    }
    this.toastrService.error(message, 'Error', {
      timeOut: 3000,
      positionClass: "toast-center"
    });
  }

  NavigateToRoute(route: string) {
    this.router.navigateByUrl(route);
  }
}
