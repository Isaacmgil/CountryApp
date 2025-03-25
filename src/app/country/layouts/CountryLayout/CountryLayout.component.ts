import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";

@Component({
  selector: 'app-CountryLayout',
  templateUrl: './CountryLayout.component.html',
  imports: [RouterOutlet, TopMenuComponent]
})
export class CountryLayoutComponent  {


}
