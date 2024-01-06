import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-view-list',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.css',
})
export class ViewListComponent implements OnInit {
  #activatedRoute = inject(ActivatedRoute);
  #taskService = inject(TaskService);

  tasks = this.#taskService.tasks;

  ngOnInit(): void {
    this.#activatedRoute.paramMap.subscribe((value) => {
      value.has('id') && this.tasks.update(value.get('id'));
    });
  }
}
