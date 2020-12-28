import { Component, OnInit } from '@angular/core';
import { showNotification } from '../helpers/notification'

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    showNotification('top','center', 'Together we are stronger!!!')
  }

}
