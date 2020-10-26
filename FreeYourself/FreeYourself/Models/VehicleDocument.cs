using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreeYourself.Models
{
    public class VehicleDocument
    {
        public int Id { get; set; }
        public int serialNumber { get; set; }

        public User owner { get; set; }

    }
}
