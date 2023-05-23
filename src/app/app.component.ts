import { Component } from '@angular/core';
import { CachingService } from './services/caching.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TimelinePageModule } from './pages/timeline/timeline.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private cachingService: CachingService) {
    // this.cachingService.initStorage();
  }
}
