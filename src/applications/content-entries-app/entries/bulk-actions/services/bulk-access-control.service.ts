import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KalturaClient } from 'kaltura-ngx-client';

import { KalturaMediaEntry } from 'kaltura-ngx-client';
import { KalturaBaseEntry } from 'kaltura-ngx-client';
import { BaseEntryUpdateAction } from 'kaltura-ngx-client';
import { BulkActionBaseService } from './bulk-action-base.service';
import { KalturaAccessControl } from 'kaltura-ngx-client';

@Injectable()
export class BulkAccessControlService extends BulkActionBaseService<KalturaAccessControl> {

  constructor(_kalturaServerClient: KalturaClient) {
    super(_kalturaServerClient);
  }

  public execute(selectedEntries: KalturaMediaEntry[], profile : KalturaAccessControl) : Observable<{}>{
    return Observable.create(observer =>{

      let requests: BaseEntryUpdateAction[] = [];

      selectedEntries.forEach(entry => {
        let updatedEntry: KalturaBaseEntry = new KalturaBaseEntry();
        updatedEntry.accessControlId = profile.id;
        requests.push(new BaseEntryUpdateAction({
          entryId: entry.id,
          baseEntry: updatedEntry
        }));
      });

      this.transmit(requests, true).subscribe(
        result => {
          observer.next({})
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });



  }

}
