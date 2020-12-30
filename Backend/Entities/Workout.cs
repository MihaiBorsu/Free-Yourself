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

    }
}