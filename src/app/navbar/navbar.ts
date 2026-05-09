import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';  // ← supprimer RouterLinkActive

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink  // ← garder seulement RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}