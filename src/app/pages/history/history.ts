import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
})
export class HistoryComponent implements OnInit {
  history: string[] = [];

  ngOnInit(): void {
    const saved = localStorage.getItem('conversionHistory');
    this.history = saved ? JSON.parse(saved) : [];
  }
}