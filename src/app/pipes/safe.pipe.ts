import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "../../environments/environment";

const apiurl = environment.apiUrl;
@Pipe({ name: 'safe' })

export class SafePipe implements PipeTransform {

constructor(private sanitizer: DomSanitizer) { }
transform(url) {
 return this.sanitizer.bypassSecurityTrustResourceUrl(apiurl+'/'+url);
  }
}
