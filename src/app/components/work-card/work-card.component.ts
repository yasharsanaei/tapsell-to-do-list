import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-work-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './work-card.component.html',
  styleUrl: './work-card.component.css',
})
export class WorkCardComponent {}
