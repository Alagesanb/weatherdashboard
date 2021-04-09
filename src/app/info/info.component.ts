import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  
  constructor() { }
  txtName: string = 'test1';
  ngOnInit(): void {
   
    

  }

  modifyName(){
    this.txtName = 'test2';
  }

}
