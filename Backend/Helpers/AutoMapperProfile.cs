using AutoMapper;
using WebApi.Entities;
using Users = WebApi.Models.Users;
using Vehicles = WebApi.Models.Vehicles;
using Guilds = WebApi.Models.Guilds;
using Workouts = WebApi.Models.Workouts;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // user maps
            CreateMap<User, Users.UserModel>();
            CreateMap<Users.RegisterModel, User>();
            CreateMap<Users.UpdateModel, User>();
            //vehicle maps
            CreateMap<Vehicle, Vehicles.RegisterModel>();
            CreateMap<Vehicles.UpdateModel,Vehicle>();
            CreateMap<Vehicles.RegisterModel, Vehicle>();
            CreateMap<Vehicle,Vehicles.UpdateModel>();
            //guild maps
            CreateMap<Guild, Guilds.RegisterModel>();//.ForSourceMember(x => x.MembersIds, opt => opt.DoNotValidate());
            CreateMap<Guilds.UpdateModel,Guild>();//.ForMember(x => x.MembersIds, opt => opt.Ignore());
            CreateMap<Guilds.RegisterModel, Guild>();//.ForMember(x => x.MembersIds, opt => opt.Ignore());
            CreateMap<Guild,Guilds.UpdateModel>();//.ForSourceMember(x => x.MembersIds, opt => opt.DoNotValidate());
            //workout maps
            CreateMap<Workout, Workouts.RegisterModel>();
            CreateMap<Workouts.UpdateModel,Workout>();
            CreateMap<Workouts.RegisterModel, Workout>();
            CreateMap<Workout,Workouts.UpdateModel>();
        }
    }
}