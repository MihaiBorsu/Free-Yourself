using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Guilds
{
  public class RegisterModel
    {
        [Required]
        public string LeaderUsername { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public int? TotalXP { get; set; }

    }
}