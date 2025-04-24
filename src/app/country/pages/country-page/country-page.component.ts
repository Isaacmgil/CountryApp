import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './country-information/country-information.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  imports: [NotFoundComponent, CountryInformationComponent]
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  CountryService = inject(CountryService);  

  countryResource = rxResource({
    request: () => ({code:this.countryCode}),
    loader: ({request}) => {
      return this.CountryService.searchCountryByCode(request.code)
    },
  });

}
