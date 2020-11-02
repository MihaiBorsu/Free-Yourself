using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreeYourself.Models
{
    public class Vehicle
    {

        public int Id { get; set; }

        public string vehicleType { get; set; }

        public DateTime registrationDate { get; set; }

        public User owner { get; set; }

        public string teamName { get; set; }

        public int currentDayXp { get; set; }

        public int TotalXp { get; set; }
    }
}
