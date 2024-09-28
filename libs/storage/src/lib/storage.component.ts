import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { indexDB } from '../core/indexdb/indexdb';

@Component({
  selector: 'lib-storage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.css',
})
export class StorageComponent  implements OnInit {
  constructor(private indexDB: indexDB) {
  }

  ngOnInit() {
    this.indexDB.createDatabase();
    console.log('next step')
  }

}
