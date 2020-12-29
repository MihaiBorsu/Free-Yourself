using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Guilds
{
  public class RegisterModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string LeaderUsername { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string TotalXP { get; set; }
    }
}