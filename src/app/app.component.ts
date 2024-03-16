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
    this.initApp()
  }

  initApp() {
    CapacitorUpdater.notifyAppReady();

    App.addListener('appStateChange', async (state) => {
      let version;
      if (state.isActive) {
        // Ensure download occurs while the app is active, or download may fail
        version = await CapacitorUpdater.download({
          url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.4/dist.zip',
          version: '0.0.4'
        })
      }

      if (!state.isActive && version) {
        // Activate the update when the application is sent to background
        //SplashScreen.show()
        try {
          await CapacitorUpdater.set(version);
          // At this point, the new version should be active, and will need to hide the splash screen
        } catch {
          //SplashScreen.hide() // Hide the splash screen again if something went wrong
        }
      }
    })
  }
}
