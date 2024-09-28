import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorageComponent } from '@mk/storage';

@Component({
  standalone: true,
  imports: [RouterModule, StorageComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'storage-sandbox';
}
