using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Vehicles
{
  public class RegisterModel
    {
        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        public string SerialNumber { get; set; }

        [Required]
        public string ProfileContact { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string is_stolen { get; set; }
    }
}