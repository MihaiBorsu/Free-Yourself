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

        public string teamStatus { get; set; }

        public string teamName { get; set; }

        public int xp { get; set; }
    }
}
