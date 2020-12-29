namespace WebApi.Entities
{
    public class Guild
    {
        public int Id { get; set; }
        public string LeaderUsername { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int? TotalXP { get; set; }
    }
}