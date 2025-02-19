import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {
  selectedSection = 'Profile';

  setSection(section: string) {
    this.selectedSection = section;
  }
}
