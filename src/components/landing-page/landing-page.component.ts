import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/authentication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  signInForm: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;
  current_year:number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
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
      this.isLoading = true;
      this.authService.login(this.signInForm.value).subscribe({
        next: (data) => {
          console.log("data (user !): ", data.data);
          
          if (data.status) {
            this.authService.saveToken(data.token);
            this.isLoading = false;
            this.router.navigate(['/main-feed']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Oops!',
            text: 'Failed to log in! Please verify your informations.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33',
          }).then(() => {
            this.signInForm.reset();
          });
        },
      });
    }
  }
}
