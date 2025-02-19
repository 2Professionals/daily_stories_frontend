import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInformationsComponent } from '../profile-informations/profile-informations.component';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, ProfileInformationsComponent],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css',
})
export class AccountSettingsComponent {
  activeComponent: string = 'profile';

  setActiveComponent(component: string) {
    this.activeComponent = component;
  }
}
