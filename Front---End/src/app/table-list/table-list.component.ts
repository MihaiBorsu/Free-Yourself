import { Component, OnInit } from '@angular/core';
import { showNotification } from '../helpers/notification'

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    showNotification('top','right', 'Between Titans')
  }

}
