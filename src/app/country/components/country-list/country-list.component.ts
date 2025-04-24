import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  imports: [DecimalPipe, RouterLink],
})
export class CountryListComponent {

  countries = input.required<Country[]>()

  errorMessage = input<string|unknown>()
  isLoading = input<boolean>(false)
  isEmpty = input<boolean>(false)

}
