import { Component } from '@angular/core';
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initApp();
    this.addCapUpdaterListeners();
  }

  async addCapUpdaterListeners() {
    await CapacitorUpdater.addListener('download', data => {
      console.log("Download event received:", data);
    });

    await CapacitorUpdater.addListener('noNeedUpdate', data => {
      console.log("No need update event received:", data);
    });

    await CapacitorUpdater.addListener('updateFailed', data => {
      console.log("Update failed event received:", data);
    });

    await CapacitorUpdater.addListener('downloadFailed', data => {
      console.log("Download failed event received:", data);
    });
  }


  initApp() {
    CapacitorUpdater.notifyAppReady();

    App.addListener('appStateChange', async (state) => {
      let version;
      if (state.isActive) {
        console.log('Got Here');
        // Ensure download occurs while the app is active, or download may fail
        version = await CapacitorUpdater.download({
          url: 'https://github.com/ehiosunbishop/live-update-testerx/raw/main/www.zip',
          version: '0.0.6'
        });

        if (version) {
          console.log('setting in the value: ');
          await CapacitorUpdater.set(version);
        }
      }
    })
  }
}
