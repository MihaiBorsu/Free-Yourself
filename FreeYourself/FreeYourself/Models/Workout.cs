using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreeYourself.Models
{
    public class Workout
    {

        public int Id { get; set; }

        public int totalKm { get; set; }

        public int difficultyLevel { get; set; }

        public User participant { get; set; }

    }
}
