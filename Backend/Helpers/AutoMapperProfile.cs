using AutoMapper;
using WebApi.Entities;
using Users = WebApi.Models.Users;
using Vehicles = WebApi.Models.Vehicles;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, Users.UserModel>();
            CreateMap<Users.RegisterModel, User>();
            CreateMap<Users.UpdateModel, User>();
            CreateMap<Vehicle, Vehicles.RegisterModel>();
            CreateMap<Vehicles.UpdateModel,Vehicle>();
            CreateMap<Vehicles.RegisterModel, Vehicle>();
            CreateMap<Vehicle,Vehicles.UpdateModel>();
        }
    }
}