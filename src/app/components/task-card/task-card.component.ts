import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TaskDto } from '../../types/dto/task-dto';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input({ required: true })
  task!: TaskDto;
}
