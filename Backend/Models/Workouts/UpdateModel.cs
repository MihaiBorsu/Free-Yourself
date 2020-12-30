using System;


namespace WebApi.Models.Workouts
{
  public class UpdateModel
    {
        public int Id { get; set; }
        public int? userId { get; set; }
        public int? XP { get; set; }
        public DateTime Date { get; set; }
    }
}