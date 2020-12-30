using System.Collections.Generic;


namespace WebApi.Models.Workouts
{
  public class DashboardModel
    {
        public int userId { get; set; }
        public int? DailyXp { get; set; }
        public int? WeeklyXp { get; set; }
        public int? MonthlyXp { get; set; }
        public int? YearlyXp { get; set; }
        public IEnumerable<int?> SevenDaysXp { get; set; }
        public IEnumerable<int?> TwelveMonthsXp { get; set; }
    }
}