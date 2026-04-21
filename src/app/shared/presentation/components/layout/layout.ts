import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {LanguageSwitcher} from '../language-switcher/language-switcher';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatToolbar,
    MatSidenavContent,
    MatIconButton,
    MatIcon,
    LanguageSwitcher
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
