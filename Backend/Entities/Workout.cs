using System;
using System.Collections.Generic;

namespace WebApi.Entities
{
    public class Workout
    {
        public int Id { get; set; }
        public int? userId { get; set; }
        public DateTime Date { get; set; }
        public int? XP { get; set; }
        // public int? DailyXp { get; set; }
        // public int? WeeklyXp { get; set; }
        // public int? MonthlyXp { get; set; }
        // public int? YearlyXp { get; set; }
        // public IEnumerable<int?> SevenDaysXp { get; set; }
        // public IEnumerable<int?> TwelveMonthsXp { get; set; }
    }
}