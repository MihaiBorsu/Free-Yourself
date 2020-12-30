using System.Collections.Generic;
using WebApi.Entities;

namespace WebApi.Models.Guilds
{
  public class UpdateModel
    {
        public int Id { get; set; }

        public string LeaderUsername { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public int? TotalXP { get; set; }
        public int? NoOfMembers { get; set; }

        // public int? NewMemberId { get; set; }
    }
}



