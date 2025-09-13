import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';
import {  MatTabsModule } from '@angular/material/tabs';
import { ROUTER_TOKENS } from '../../app.routes.constant';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  protected readonly ROUTER_TOKENS = ROUTER_TOKENS;
}
