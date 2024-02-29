import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  ngOnInit() {}

  constructor(private router: Router) {}

  onLogin(form: NgForm) {
    this.router.navigate(['/main-list']);
  }
}
