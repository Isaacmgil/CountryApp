import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  imports: [CountryListComponent],
})

export class ByRegionPageComponent {

  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region|null>(null);

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({request}) => {
      console.log('Loading countries by region', request);

      if( !request.region) return of([]);

      return this.countryService.searchByRegion(request.region)

    },
  });

}
