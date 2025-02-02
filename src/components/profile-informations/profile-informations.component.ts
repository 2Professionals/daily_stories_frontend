import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Import ReactiveFormsModule
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-informations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './profile-informations.component.html',
  styleUrls: ['./profile-informations.component.css'],
})
export class ProfileInformationsComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSave() {
    if (this.profileForm.valid) {
      console.log('Form Data: ', this.profileForm.value);
    } else {
      console.log('Form is invalid!');
    }
  }
}
