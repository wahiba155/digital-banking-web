// admin-template.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './admin-template.html'
})
export class AdminTemplateComponent {}