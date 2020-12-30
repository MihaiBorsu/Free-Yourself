namespace WebApi.Models.Vehicles
{
  public class UpdateModel
    {

        public int Id { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Date { get; set; }
        public string SerialNumber { get; set; }
        public string ProfileContact { get; set; }
        public int? UserId { get; set; }
        public string photoLink { get; set; }

    }
}