import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  imports: [SearchInputComponent, CountryListComponent],
})
export class ByCountryPageComponent  {

  countryService = inject(CountryService);
  ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {

      if( !request.query) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query,
        }
      });

      return this.countryService.searchByCountry(request.query)

    },
  });

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({request}) => {

  //     if( !request.query) return [];


  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     );

  //   },
  // })

}
