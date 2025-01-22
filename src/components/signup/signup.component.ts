import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SignUpService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signUpService: SignUpService
  ) {
    this.signupForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.minLength(3)]],
      user_firstname: ['', Validators.required],
      user_lastname: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.signUpService.registerUser(formData).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/main-feed']); // Navigate to the main feed
        },
        error: (error) => {
          console.error('Error registering user:', error);
        },
      });
    } else {
      console.error('Form is invalid!');
    }
  }
}
