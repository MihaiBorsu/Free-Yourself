using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreeYourself.Models
{
    public class User
    {

        public int Id { get; set; }

        public string username { get; set; }

        //if team leader or not, not needed because Team has an admin User
        //public string teamStatus { get; set; }

        public string teamName { get; set; }

        // total xp from the begining
        public int combinedDailyXp { get; set; }

        public int totalXp {get; set; }

        public int comboDays{ get; set; }
    }
}
