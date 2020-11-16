import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { SearchService } from '../search.service';
import { MatSelectChange } from "@angular/material/select";
import * as _ from 'lodash'; 

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public currentData: any;
  public hourlyData: any;
  public day16Data: any;
  pathName: string;
  forecasttype = new FormControl();
  forecastList: string[] = ['','Current Forecast', 'Hourly Forecast', '16-day Forecast'];
  selectedData: { value: string; text: string };
  getcurrentForecast = localStorage.getItem('currentForecast');
  storeCurrentdata: any;
   
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private searchWeatherService: SearchService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pathName = params['name'];
      console.log('retrievedObject: ', JSON.parse(this.getcurrentForecast));
      this.storeCurrentdata = JSON.parse(this.getcurrentForecast);
      // let storevalue = _(this.storeCurrentdata) .filter(x => x.main).value() ;   
    });

    

    this.weatherSearchForm = this.formBuilder.group({
      city: [''],
      state: [''],
      country: [''],
      zipcode: [''],
      latitude:[''],
      longitude:[''],
      forecastdata: [''],
    });
  }

   // Forecast type change
  selectedValue(event: MatSelectChange) {
    this.selectedData = {
      value: event.value,
      text: event.source.triggerValue
    };
  }

  
  weatherSearchbyLocation(formValues){
    console.log(formValues);
    //Current Forecast
    if(formValues.forecastdata === 'Current Forecast'){
      var currentForecastInfo = JSON.parse(window.localStorage.getItem('currentForecast')) || [];
      this.searchWeatherService
        .getCurrent(formValues.forecastdata,formValues.city, formValues.state, formValues.country)
        .subscribe(data => {
          this.currentData = data;
          currentForecastInfo.push(this.currentData);
          window.localStorage.setItem('currentForecast', JSON.stringify(currentForecastInfo));
      });
    }
    

      if(formValues.forecastdata === 'Hourly Forecast'){
        // Hourly Forecast
        var hourlyForecastInfo = JSON.parse(window.localStorage.getItem('hourlyForecast')) || [];
        this.searchWeatherService
          .getHourly( formValues.forecastdata, formValues.latitude, formValues.longitude )
          .subscribe(data => {
            this.hourlyData = data;
            hourlyForecastInfo.push(this.hourlyData);
            window.localStorage.setItem('hourlyForecast', JSON.stringify(hourlyForecastInfo));
        });
      }

      if(formValues.forecastdata === '16-day Forecast'){
        // 16 day Forecast
        var Day16ForecastInfo = JSON.parse(window.localStorage.getItem('16dayForecast')) || [];
        this.searchWeatherService
          .get16DayForecast( formValues.forecastdata, formValues.latitude, formValues.longitude )
          .subscribe(data => {
            this.day16Data = data;
            console.log("16-day data",this.day16Data);
            Day16ForecastInfo.push(this.day16Data);
            window.localStorage.setItem('16dayForecast', JSON.stringify(Day16ForecastInfo));
        });
      }
    
    
        
  }

}
