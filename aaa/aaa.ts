import {Component, OnInit} from '@angular/core';
import {City} from '../city';
import {WeatherService} from '../weather.service';
import {promise} from 'selenium-webdriver';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  // temp: boolean;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {

  }

  setName(value) {
    let city = new City();
    const weatherSTemp = this.weatherService.weather;
    this.weatherService.getCityByName(value)
      .subscribe(myCity => {
        city = myCity;
      });
    const api = this.weatherService.requestApi(city.name, city.country);
    this.checkOnCache(api, weatherSTemp);
  }

  checkOnCache(api, weatherSTemp) {
    console.log('ccccccc');
    // caches.open('ngsw:1:data:dynamic:weather-api:cache').then(function (cache) {
    //   //       cache.keys().then(function (keys) {
    //   //           if (keys.length > 0) {
    //   cache.matchAll().then(function (urlsApi) {
    //     if (urlsApi.length > 0) {
    //       urlsApi.forEach(function (url) {
    //         url.json().then(function (jsonRes) {
    //           if (jsonRes.name === city.name) {
    //             weatherSTemp.weatherById(jsonRes);
    //           }
    //         });
    //       });
    //     }
    //   });
    //   // }
    //   // });
    // });
    const me = this;
    let flag = true;
    // this.temp = false;
    caches.open('ngsw:1:data:dynamic:weather-api:cache').then(function (cache) {
      return cache;
    }).then(function (cache) {
      return cache.matchAll();
    }).then(function (urlsApi) {
      if (urlsApi.length > 0) {
        urlsApi.forEach(function (urlApi) {
          console.log('api', api);
          console.log('prom', urlApi.url);
          if (api === urlApi.url) {
            urlApi.json().then(function (response) {
              weatherSTemp.weatherById(response);
            });
            flag = false;
          }
          // urlApi.json().then(function (jsonRes) {
          //   if (jsonRes.name === city.name) {
          //     console.log(`${ city.name} from cache`);
          //     weatherSTemp.weatherById(jsonRes);
          //     return true;
          //   }
          // });
        });
        if (flag) {
          me.checkOnNet(api, weatherSTemp);
        }
      } else {
        me.checkOnNet(api, weatherSTemp);
      }
    });
  }

  checkOnNet(api, weatherSTemp) {
    console.log('nnnnnnnn');
    caches.open('ngsw:1:data:dynamic:weather-api:cache').then(function (cache) {
      fetch(`${api}`).then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const resData = response.clone();
        cache.put(`${api}`, response);
        return resData.json();
      }).then(function (json) {
        // console.log(`${ city.name} from net`);
        weatherSTemp.weatherById(json);
      });

      //   function updateWeather(json) {
      // }
    });
    // this.updateWeather(dataJsonClone);
    // }
    // this.weatherService.requestWeatherApi(city.name, city.country)
    //   .subscribe(weatherApi => {
    //       this.updateWeather(weatherApi);
    //     }
    //   );
  }

}
