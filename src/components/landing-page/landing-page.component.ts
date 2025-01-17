import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import here

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get username() {
    return this.signInForm.get('username');
  }

  get email() {
    return this.signInForm.get('email');
  }

  onSignIn() {
    if (this.signInForm.valid) {
      console.log('Form Submitted', this.signInForm.value);
    }
  }
}
