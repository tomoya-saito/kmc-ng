import {Component, ViewChild} from '@angular/core';
import {PopupWidgetComponent} from '@kaltura-ng/kaltura-ui/popup-widget/popup-widget.component';
import {KalturaMediaType} from 'kaltura-ngx-client/api/types/KalturaMediaType';
import {PrepareEntryComponent} from '../prepare-entry/prepare-entry.component';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';

@Component({
  selector: 'kUploadButton',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
})
export class UploadButtonComponent {
  @ViewChild('uploadmenu') uploadMenuPopup: PopupWidgetComponent;
  @ViewChild('uploadsettings') uploadSettingsPopup: PopupWidgetComponent;
  @ViewChild('createLive') createLivePopup: PopupWidgetComponent;
  @ViewChild('prepareEntry') prepareEntryComponent: PrepareEntryComponent;
  @ViewChild('bulkuploadmenu') bulkUploadMenu: PopupWidgetComponent;

  disabled = true;

  constructor(private _appPermissions: KMCPermissionsService) {
      this.disabled = !this._appPermissions.hasAnyPermissions([
          KMCPermissions.CONTENT_INGEST_UPLOAD,
          KMCPermissions.CONTENT_INGEST_BULK_UPLOAD,
          KMCPermissions.CONTENT_INGEST_ORPHAN_VIDEO,
          KMCPermissions.CONTENT_INGEST_ORPHAN_AUDIO,
          KMCPermissions.LIVE_STREAM_ADD
      ]);
  }

  _onMenuItemSelected(item: string): void {
    this.uploadMenuPopup.close();

    switch (item) {
      case 'uploadFromDesktop':
        this.uploadSettingsPopup.open();
        break;
      case 'bulkUpload':
        this.bulkUploadMenu.open();
        break;
      case 'prepareVideoEntry':
        this.prepareEntryComponent.prepareEntry(KalturaMediaType.video);
        break;
      case 'prepareAudioEntry':
        this.prepareEntryComponent.prepareEntry(KalturaMediaType.audio);
        break;
      case 'createLive':
        this.createLivePopup.open();
        break;
      default:
        break;
    }
  }
}

