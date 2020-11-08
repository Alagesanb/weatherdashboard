import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Forecast } from '../../src/app/shared/forecast';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  YOUR_API_KEY = '17fc0060501cd9c819f368923f98e5af';
  Current_Forecast_API = 'https://api.openweathermap.org/data/2.5/weather?q=';
  Hourly_Forecast_API = 'https://api.openweathermap.org/data/2.5/onecall?lat=';
  Day_16_Forecast_API = 'https://api.openweathermap.org/data/2.5/onecall?lat=';


  constructor(private http: HttpClient) { }

  //Current Forecast
  getCurrent(currentForecast,currentCity,currentState,currentCountry){
    if(currentForecast === 'Current Forecast'){
      if(currentCity !== undefined && currentState !== undefined && currentCountry !== undefined){
        console.log('3');
        return this.http.get(
          this.Current_Forecast_API + currentCity +',' + currentState +','+ currentCountry +'&APPID=' + this.YOUR_API_KEY
        ).pipe(
          retry(1),
          catchError(this.handleError)
        );
      }
    }
  }
  
  // Hourly Forecast
  getHourly(forecastdata, latitude, longitude): Observable<Forecast[]>{
    if(forecastdata === 'Hourly Forecast'){
        if( forecastdata !== undefined && latitude !==undefined && longitude !== undefined){
          return this.http.get<Forecast[]>(
            this.Hourly_Forecast_API +latitude + '&lon='+ longitude +'&lang=en&APPID=' + this.YOUR_API_KEY
          ).pipe(
            retry(1),
            catchError(this.handleError)
          );
        }
    }
  }

  // 16 day Forecast
  get16DayForecast(forecastdata, latitude, longitude): Observable<Forecast[]>{
    if(forecastdata === '16-day Forecast'){
        console.log(forecastdata);
        if( forecastdata !== undefined && latitude !==undefined && longitude !== undefined){
          return this.http.get<Forecast[]>(
            this.Day_16_Forecast_API +latitude + '&lon='+ longitude +'&exclude=hourly,daily&APPID=' + this.YOUR_API_KEY
          ).pipe(
            retry(1),
            catchError(this.handleError)
          );
        }
    }
  }
  
  // Error Handler
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
