import { from, of, throwError } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, catchError, switchMap, concatMap } from "rxjs/operators";
import { randomIntFromInterval, getWDfromDBP } from './utilitySPARQL';
import { throws } from "assert";

interface WDResponse {
    label: string;
    code: string;
}
// distarctor countries are countries from same continent with population over 10millions
// if country too small laeads to too few values on topics, leads to blank questions

const getSparqlCountryList = (countryWD: string) => {

    const proxyurl = "https://quiz-magnet.herokuapp.com/";
    const queryCountryList = `
    SELECT distinct ?countryLabel ?country ?population
        WHERE {
        wd:${countryWD} wdt:P31 ?hypernym.
        wd:${countryWD} wdt:P30 ?continent.
        ?country wdt:P31 ?hypernym.
        ?country wdt:P30 ?continent.
        ?country wdt:P1082 ?population.
        FILTER NOT EXISTS { ?country wdt:P576 ?existedInPast.}
        FILTER ( ?population >= 10000000)
        FILTER ( ?country != wd:${countryWD})
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
ORDER BY DESC(?population)
    `
    const  request$ = ajax(
        {
            url: proxyurl + 'https://query.wikidata.org/sparql', 
            method: 'POST',
            headers: {
                'Content-Type': 'application/sparql-query',
                'Accept': 'application/sparql-results+json'
            },
            body: queryCountryList
        }
      ).pipe(
        map(response => {
            console.log('response: ', response.response.results.bindings)
            return response.response.results.bindings;
        
        }),
        map((results:any[]) => {
             const fullList: WDResponse[] = results.map( (el:any) => { 
                 return { 
                    label: el.countryLabel.value,
                    code: el.country.value.replace("http://www.wikidata.org/entity/",""),
                    }
                })
                // get 5 random countries to make Distractor experience better
            return [
              fullList[randomIntFromInterval(0,fullList.length-1)],
              fullList[randomIntFromInterval(0,fullList.length-1)],
              fullList[randomIntFromInterval(0,fullList.length-1)],
              fullList[randomIntFromInterval(0,fullList.length-1)],
              fullList[randomIntFromInterval(0,fullList.length-1)],
            ];
           
        }),
        catchError(error => {
          console.log('error: ', error);
          return of(error);
        })
      )
    return request$;
  }

  // distractor on regions, from same country
  const getSparqlRegionList = (regionWD: string) => {

    const proxyurl = "https://quiz-magnet.herokuapp.com/";
    const queryCountryList = `
    SELECT distinct ?regionLabel ?region ?population
    WHERE {
    wd:${regionWD} wdt:P31 ?hypernym.
    ?region wdt:P31 ?hypernym.
    ?region wdt:P1082 ?population.
    FILTER NOT EXISTS { ?region wdt:P576 ?existedInPast.}
    FILTER (?region != wd:${regionWD} )
    OPTIONAL{?region wdt:P18 ?image.}
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
    ORDER BY DESC(?population)
    LIMIT 200
    `
    const  request$ = ajax(
        {
            url: proxyurl + 'https://query.wikidata.org/sparql', 
            method: 'POST',
            headers: {
                'Content-Type': 'application/sparql-query',
                'Accept': 'application/sparql-results+json'
            },
            body: queryCountryList
        }
      ).pipe(
        map(response => {
            console.log('response: ', response.response.results.bindings)
          
            return response.response.results.bindings;
        
        }),
        map((results:any[]) => {
             const fullList: WDResponse[] = results.map( (el:any) => { 
                 return { 
                    label: el.regionLabel.value,
                    code: el.region.value.replace("http://www.wikidata.org/entity/",""),
                    }
                })
            //const index = fullList.findIndex(el => el.code === regionWD);
            return [
              fullList[randomIntFromInterval(0,fullList.length-1)],
              fullList[randomIntFromInterval(0,fullList.length-1)],
              fullList[randomIntFromInterval(0,fullList.length-1)],
            ];
         
            //get the DBPedia article from WikiData code
           // return getDBPfromWD(selectedRegion.code);
             
        }),

        catchError(error => {
          console.log('error: ', error);
          return of(error);
        })
      )
    return request$;
  }
  
// distractor on cities
  const getSparqlPlaceList = (placeWD: string) => {
      console.log('placeWD',placeWD);

      let selectedPlace = { 
        label: '',
        code: ''
      }

    const queryPlace = `https://dbpedia.org/sparql?query=
    PREFIX owl:<http://www.w3.org/2002/07/owl%23> 
    PREFIX ont:<http://dbpedia.org/ontology/> 
    PREFIX purl:<http://purl.org/linguistics/gold/> 
    PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema%23>
    SELECT ?place ?placeLabel WHERE 
    {
        ?target owl:sameAs <http://www.wikidata.org/entity/${placeWD}>.
        ?target purl:hypernym ?hypernym.
        ?target ont:country ?country.
        ?target ont:populationTotal ?targetPopulation.
        ?place ont:populationTotal ?placePopulation.
        ?place purl:hypernym ?hypernym.
        ?place ont:country ?country.
        ?place rdfs:label ?placeLabel.
        FILTER (LANG(?placeLabel) = "en")
        FILTER (?target != ?place )
    } 
    ORDER BY DESC(?placePopulation) 
    LIMIT 500&format=json`;
  
    //replace the hashtag char as bug
   const  request$ = ajax(encodeURI(queryPlace).replace(/%2523/g,'%23'))
     .pipe(
        map(response => {
            console.log('DBPEDIA response: ', response);
            return response.response.results.bindings;
        
        }),
        concatMap((results:any[]) => {
            const fullList: WDResponse[] = results.map( (el:any) => { 
                return { 
                   label: el.placeLabel.value,
                   code: el.place.value
                   }
               })
           //const index = fullList.findIndex(el => el.code === regionWD);
           selectedPlace = {...fullList[randomIntFromInterval(0,fullList.length-1)]};
           console.log('selectedPlace',selectedPlace);
           return getWDfromDBP(selectedPlace.code);
       }),
       map(codeWD => {
       selectedPlace.code = codeWD.replace("http://www.wikidata.org/entity/","");
       console.log('selectedPlace***********************', selectedPlace);
        return [selectedPlace,selectedPlace,selectedPlace];
    }),
       catchError(error => {
         console.log('error: ', error);
         return of(error);
       })
       
      )
    return request$;
  }


  export {
    getSparqlCountryList,
    getSparqlRegionList,
    getSparqlPlaceList,
  };
