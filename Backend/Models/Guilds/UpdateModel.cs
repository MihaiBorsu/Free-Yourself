namespace WebApi.Models.Guilds
{
  public class UpdateModel
    {
        public int Id { get; set; }

        public string LeaderUsername { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string TotalXP { get; set; }
    }
}



