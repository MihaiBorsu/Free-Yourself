

import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { showNotification } from '../helpers/notification'
import { XpService } from "../services/xp.service";
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard: any

  constructor(private xpService: XpService,
             private userService : UserService) { }

  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.dashboard = {
      dailyXp: 0,
      weeklyXp: 0,
      monthlyXp: 0,
      yearlyXp: 0
    }
    this.userService.getDashboard(user.id).subscribe(
      res => {
        this.dashboard = res
        // showNotification('top','center', 'Between Titans')
      
       /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
       showNotification('bottom','left', 'Move you body and check your result in Dashboard!')
       
      //  this.dashboard.sevenDaysXp = [20,32,21,38,6,24,3]
 
      let weeklabels = this.getWeekDays()

       const dataDailySalesChart: any = {
         labels: weeklabels,
         series: [this.dashboard.sevenDaysXp.reverse()]
     };
 
      const optionsDailySalesChart: any = {
           lineSmooth: Chartist.Interpolation.cardinal({
               tension: 0
           }),
           low: 0,
           high: 200, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
           chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
       }
 
       var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
 
       this.startAnimationForLineChart(dailySalesChart);
 
 
       /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
 
       const dataCompletedTasksChart: any = {
           labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
           series: [
               [230, 750, 450, 300, 280, 240, 200, 190]
           ]
       };
 
      const optionsCompletedTasksChart: any = {
           lineSmooth: Chartist.Interpolation.cardinal({
               tension: 0
           }),
           low: 0,
           high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
           chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
       }
 
       var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
 
       // start animation for the Completed Tasks Chart - Line Chart
       this.startAnimationForLineChart(completedTasksChart);
 
 
 
       /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
 
      //  this.dashboard.twelveMonthsXp = [200,320,210,380,60,240,30,200,320,210,380,60]

      let monthlabels = this.getMonths()
       var datawebsiteViewsChart = {
         labels: monthlabels,
         series: [
          this.dashboard.twelveMonthsXp.reverse()
 
         ]
       };
       var optionswebsiteViewsChart = {
           axisX: {
               showGrid: false
           },
           low: 0,
           high: 500,
           chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
       };
       var responsiveOptions: any[] = [
         ['screen and (max-width: 640px)', {
           seriesBarDistance: 5,
           axisX: {
             labelInterpolationFnc: function (value) {
               return value[0];
             }
           }
         }]
       ];
       var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
 
       //start animation for the Emails Subscription Chart
       this.startAnimationForBarChart(websiteViewsChart);
      
      
      
      }, err => {
        console.log("Error at getGuilds")
      })
    
     
  }

  workout(activity){
    this.xpService.setCurrentWorkout(activity)
  }

  getWeekDays(){
    let labels = ['S','M', 'T', 'W', 'T', 'F', 'S', 'S','M', 'T', 'W', 'T', 'F', 'S']
    let newLabels = []
    let today = new Date().getDay();
 
    for(let i=0; i<7; i++){
      newLabels.push(labels[today+1])
      today = today + 1
    }

    return newLabels;
  }

  getMonths(){
    let labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
    let newLabels = []
    let month = new Date().getMonth();
    console.log(month)

    for(let i=0; i<12; i++){
      newLabels.push(labels[month + 1])
      month = month + 1
    }
    console.log(newLabels)

    return newLabels;
  }

}
