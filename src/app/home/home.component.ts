import { Component, inject } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  selectedTabIndex = 0;

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.router.navigate(['/home/jobs']);
    } else if (event.index === 1) {
      this.router.navigate(['/home/favourites']);
    }
  }

  ngOnInit() {
    this.updateSelectedTab(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url.includes('/home/jobs')) {
          this.selectedTabIndex = 0;
        } else if (this.router.url.includes('/home/favourites')) {
          this.selectedTabIndex = 1;
        }
      });
  }

  private updateSelectedTab(url: string) {
    const child = this.route.firstChild;
    if (child) {
      const path = child.snapshot.url.map((seg) => seg.path).join('/');
      if (path.startsWith('jobs')) {
        this.selectedTabIndex = 0;
      } else if (path.startsWith('favourites')) {
        this.selectedTabIndex = 1;
      }
    } else {
      if (url.includes('/home/jobs')) {
        this.selectedTabIndex = 0;
      } else if (url.includes('/home/favourites')) {
        this.selectedTabIndex = 1;
      }
    }
  }
}
