import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-searchinfo',
  templateUrl: './searchinfo.component.html',
  styleUrls: ['./searchinfo.component.css']
})
export class SearchinfoComponent implements OnInit {

  getcurrentForecast = localStorage.getItem('currentForecast');
  constructor() { }  

  ngOnInit(): void {

  
  }

}
