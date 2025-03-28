import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  imports: [SearchInputComponent, CountryListComponent],
})
export class ByCountryPageComponent  {

  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({request}) => {
  
      if( !request.query) return []; 


      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      );

    },
  })

}
