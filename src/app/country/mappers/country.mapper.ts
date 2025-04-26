import { ActivatedRoute } from "@angular/router";
import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";
import { inject } from "@angular/core";

export class CountryMapper {
    countryCode = inject(ActivatedRoute).snapshot.params['code'];

    static mapRestCountryToCountry (restCountry: RESTCountry): Country {

        let currencySymbol: string = '';
        if (restCountry.currencies) {
            const currencyValues = Object.values(restCountry.currencies);
            if (currencyValues.length > 0) {
                currencySymbol = currencyValues[0].symbol;
            }
        }

        let currencyCode: string = '';
        if (restCountry.currencies) {
            currencyCode = Object.keys(restCountry.currencies).join(',');
        }

        return{
            capital: restCountry.capital?.length ? restCountry.capital.join(',') : 'No consta capital',
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa'].common ?? 'No Spanish Name',
            population: restCountry.population,

            region: restCountry.region,
            subregion: restCountry.subregion,
            borders: restCountry.borders?.join( ', ' ),
            currency: currencyCode,
            languages: restCountry.languages ? Object.keys(restCountry.languages).join(', ') : 'No tiene idioma',
            currencySymbol: currencySymbol,
        }
    }


    static mapRestCountryArrayToCountryArray (restCountries: RESTCountry[]):Country[] {
        return restCountries.map(this.mapRestCountryToCountry)
    }


}
