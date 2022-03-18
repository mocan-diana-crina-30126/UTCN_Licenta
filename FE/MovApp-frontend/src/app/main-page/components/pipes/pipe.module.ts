import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterPipe } from "./filter.pipe";
import { NumberWithCommasPipe } from "./number-with-commas.pipe";

@NgModule({
    declarations: [
        FilterPipe,
        NumberWithCommasPipe
    ],
    exports: [
        FilterPipe,
        NumberWithCommasPipe
    ],
    imports: [
        CommonModule
    ]
})

export class PipeModule {}