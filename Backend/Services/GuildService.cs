using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IGuildService
    {
        IEnumerable<Guild> GetAll();
        Guild GetById(int id);
        Guild Create(Guild guild);
        void Update(Guild guild);
        void Delete(int id);
        IEnumerable<Guild> GetGuildRanking();
    }

    public class GuildService : IGuildService
    {
        private DataContext _context;

        public GuildService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Guild> GetAll()
        {
            return _context.Guilds;
        }

        public Guild GetById(int id)
        {
            return _context.Guilds.Find(id);
        }

        public Guild Create(Guild guild)
        {
            if (_context.Guilds.Any(x => x.Name == guild.Name))
                throw new AppException("Guild name \"" + guild.Name + "\" is already taken");

            guild.NoOfMembers = 0;
            // guild.MembersIds = new List<User>();
            // guild.MembersIds.Add(1);
            // guild.MembersIds.Add(2);

            _context.Guilds.Add(guild);
            _context.SaveChanges();

            return guild;
        }

        public void Update(Guild guildParam)
        {
            var guild = _context.Guilds.Find(guildParam.Id);

            if (guild == null)
                throw new AppException("Guild not found");

            // update guildname if it has changed
            if (!string.IsNullOrWhiteSpace(guildParam.Name) && guildParam.Name != guild.Name)
            {
                // throw error if the new name is already taken
                if (_context.Guilds.Any(x => x.Name == guildParam.Name))
                    throw new AppException("Guild name " + guildParam.Name + " is already taken");

                guild.Name = guildParam.Name;
            }

            // update guild properties if provided
            if (!string.IsNullOrWhiteSpace(guildParam.LeaderUsername))
                guild.LeaderUsername = guildParam.LeaderUsername;

            if (!string.IsNullOrWhiteSpace(guildParam.Name))
                guild.Name = guildParam.Name;

            if (!string.IsNullOrWhiteSpace(guildParam.City))
                guild.City = guildParam.City;

            if (!string.IsNullOrWhiteSpace(guildParam.Country))
                guild.Country = guildParam.Country;

            if (guildParam.TotalXP.HasValue)
                guild.TotalXP = guildParam.TotalXP;

            _context.Guilds.Update(guild);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var guild = _context.Guilds.Find(id);
            if (guild != null)
            {
                _context.Guilds.Remove(guild);
                _context.SaveChanges();
            }
        }

        public IEnumerable<Guild> GetGuildRanking()
        {
            return _context.Guilds.OrderByDescending(x => x.TotalXP);
        }
    }
}