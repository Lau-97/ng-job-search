import {
  Component,
  computed,
  inject,
  signal,
  Signal,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ROUTER_TOKENS } from '../../app.routes.constant';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private readonly _router: Router = inject(Router);
  private readonly _currentUrl: Signal<string>;
  private readonly _lastSelectedTabIndex = signal<number | undefined>(undefined);
  protected readonly selectedTabIndex: Signal<number | undefined> = computed(() => {
    const url = this._currentUrl?.() ?? '';
    if (url.includes(ROUTER_TOKENS.JOBS)) return 0;
    if (url.includes(ROUTER_TOKENS.FAVOURITES)) return 1;
    return this._lastSelectedTabIndex();
  });

  private readonly _tabRoutes: Record<number, string[]> = {
    0: [ROUTER_TOKENS.HOME, ROUTER_TOKENS.JOBS],
    1: [ROUTER_TOKENS.HOME, ROUTER_TOKENS.FAVOURITES],
  };

  onTabChange(event: MatTabChangeEvent): void {
    const targetRoute = this._tabRoutes[event.index];
    if (targetRoute) {
      this._lastSelectedTabIndex.set(event.index);
      this._router.navigate(targetRoute);
    }
  }

  constructor() {
    const initialUrl ='/';
    this._currentUrl = toSignal(
      this._router?.events.pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        map((event) => event.urlAfterRedirects ?? initialUrl)
      ),
      { initialValue:initialUrl }
    );
  }
}
