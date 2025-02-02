import { Component } from '@angular/core';
import { AuthService } from '../../services/authentication.service';
import { RouterLink, Router} from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-feed',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, RouterLink],
  templateUrl: './main-feed.component.html',
  styleUrl: './main-feed.component.css',
})
export class MainFeedComponent {
  isLoading: boolean = false;
  current_year:number = new Date().getFullYear()
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logOut() {
    this.isLoading = true;
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
