using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Workouts
{
  public class RegisterModel
    {
        [Required]
        public int? userId { get; set; }
        [Required]
        public int? XP { get; set; }
    }
}