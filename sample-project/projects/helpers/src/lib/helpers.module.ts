import { NgModule } from '@angular/core';
import { CdOnDirective } from './cd-on.directive';
import {PushPipe} from "./push.pipe";
import { LetDirective } from './let.directive';



@NgModule({
  declarations: [CdOnDirective, PushPipe, LetDirective],
  imports: [
  ],
  exports: [CdOnDirective, PushPipe]
})
export class HelpersModule { }
