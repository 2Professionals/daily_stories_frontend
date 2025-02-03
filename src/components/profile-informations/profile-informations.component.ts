import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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
      role: ['user', Validators.required],
    });
  }
  ngOnInit() {
    const userDataRaw = sessionStorage.getItem('userData');
    if (userDataRaw) {
      const userData = JSON.parse(userDataRaw);
      this.profileForm.setValue({
        username: userData.user_username,
        firstName: userData.user_name,
        lastName: userData.user_lastname,
        email: userData.user_email,
        password: userData.user_password,
        role: userData.role_name,
      });
    }
  }
  onSave() {
    if (this.profileForm.valid) {
      console.log('Form Data: ', this.profileForm.value);
    } else {
      Swal.fire({
        title: 'Oops!',
        text: 'PLease fill in all the infomations!',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
      });
    }
  }
}
