using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreeYourself.Models
{
    public class Team
    {
        public int Id { get; set; }

        public string name { get; set; }

        public string teamBase { get; set; }

        public User admin { get; set; }

        public ICollection<User> users {get; set; }

    }
}
