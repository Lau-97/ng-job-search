import { Component, computed, inject, Signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ROUTER_TOKENS } from '../app.routes.constant';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private currentUrl: Signal<String> = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => {
        const child = this.route.firstChild;
        return child
          ? child.snapshot.url.map((seg) => seg.path).join('/')
          : this.router.url;
      })
    ),
    { initialValue: this.router.url }
  );

  readonly selectedTabIndex: Signal<number> = computed(() => {
    const url = this.currentUrl();
    return url.includes(ROUTER_TOKENS.JOBS)
      ? 0
      : url.includes(ROUTER_TOKENS.FAVOURITES)
      ? 1
      : 0;
  });

  private readonly tabRoutes: Record<number, string[]> = {
    0: [ROUTER_TOKENS.HOME, ROUTER_TOKENS.JOBS],
    1: [ROUTER_TOKENS.HOME, ROUTER_TOKENS.FAVOURITES],
  };

  onTabChange(event: MatTabChangeEvent): void {
    const currentIndex = this.selectedTabIndex();
    if (event.index === currentIndex) return;
    const targetRoute = this.tabRoutes[event.index];
    if (targetRoute) {
      this.router.navigate(targetRoute);
    }
  }
}
