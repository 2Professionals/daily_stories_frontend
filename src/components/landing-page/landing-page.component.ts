import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  signInForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    //still validation to be implemented: , Validators.minLength(3)
    
    this.signInForm = this.fb.group({
      user_email: ['', [Validators.required]],
      user_password: ['', [Validators.required]],
    });
  }

  get username() {
    return this.signInForm.get('user_username');
  }

  get password() {
    return this.signInForm.get('user_password');
  }

  onSignIn() {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token); // Save the JWT token
          console.log('Login successful');
          this.router.navigate(['/main-feed']); // Redirect to the dashboard or any secure page
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Login failed. Please try again.';
        },
      });
    }
  }
}
