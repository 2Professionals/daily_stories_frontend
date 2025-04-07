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
import { AuthService } from '../../services/authentication.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signUpService: SignUpService,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      user_username: ['', [Validators.required, Validators.minLength(3)]],
      user_name: ['', Validators.required],
      user_lastname: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const formData = this.signupForm.value;

      this.signUpService.registerUser(formData).subscribe((data: any) => {
        this.isLoading = false;
        if (data.status) {
          Swal.fire({
            title: 'Success!',
            text: 'You are successfully signed up! Welcome.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            this.authService.saveToken(data.token);
            sessionStorage.setItem('userData', JSON.stringify(data.data));
            this.router.navigate(['/main-feed']);
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to sign you up! Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33',
          }).then(() => {
            this.signupForm.reset();
          });
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill in all the required fields.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f59e0b',
      });
    }
  }
}
