using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
// using WebApi.Helpers.DataContext;

namespace WebApi.Services
{
    public interface IWorkoutService
    {
        IEnumerable<Workout> GetAll();
        Workout GetById(int id);
        Workout Create(Workout workout);
        void Update(Workout workout);
        void Delete(int id);
        int? GetTotalUserXPInOneDay(DateTime day, int userId);
        int? GetTotalUserXPInLast7Days(DateTime day, int userId);
        int? GetTotalUserXpInLastMounth(DateTime day, int userId);
        int? GetTotalUserXPInLastYear(DateTime day, int userId);
        IList<int?> GetUserXpInEachLast7Days(DateTime day, int userId);
        IList<int?> GetUserXpInEachLast12Months(DateTime day, int userId);
        int? GetUserXpTotal(int userId);
    }

    public class WorkoutService : IWorkoutService
    {
        private DataContext _context;

        public WorkoutService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Workout> GetAll()
        {
            return _context.Workouts;
        }

        public Workout GetById(int id)
        {
            return _context.Workouts.Find(id);
        }

        public Workout Create(Workout workout)
        {
            _context.Workouts.Add(workout);
            _context.SaveChanges();

            return workout;
        }

        public void Update(Workout workoutParam)
        {
            var workout = _context.Workouts.Find(workoutParam.Id);

            if (workout == null)
                throw new AppException("workout not found");

            // update workout properties if provided

            if (workoutParam.XP.HasValue)
                workout.XP = workoutParam.XP;

            if (workoutParam.userId.HasValue)
                workout.XP = workoutParam.XP;

            if (workout.Date != workoutParam.Date)
                workout.Date = workoutParam.Date;

            _context.Workouts.Update(workout);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var workout = _context.Workouts.Find(id);
            if (workout != null)
            {
                _context.Workouts.Remove(workout);
                _context.SaveChanges();
            }
        }

        // some helper functions
        public int? GetTotalUserXPInOneDay(DateTime day, int userId)
        {
            int? sum = 0;
            var workouts_in_a_day =  _context.Workouts.Where(w => w.userId.Equals(userId)).Where(w => w.Date.Equals(day));
            foreach (var workout in workouts_in_a_day)
            {
                sum += workout.XP;
            }

            return sum;
        }

        public int? GetTotalUserXPInLast7Days(DateTime day, int userId)
        {
            int? sum = 0;
            for (int i=0; i>-7; i--)
            {
                sum += GetTotalUserXPInOneDay(day.AddDays(i), userId);
            }

            return sum;
        }

        public int? GetTotalUserXpInLastMounth(DateTime day, int userId)
        {
            int? sum = 0;
            for (int i=0; i>-30; i--)
            {
                sum += GetTotalUserXPInOneDay(day.AddDays(i), userId);
            }

            return sum;
        }

        public int? GetTotalUserXPInLastYear(DateTime day, int userId)
        {
            int? sum = 0;
            for (int i=0; i>-12; i--)
            {
                sum += GetTotalUserXpInLastMounth(day.AddMonths(i), userId);
            }

            return sum;
        }

        public IList<int?> GetUserXpInEachLast7Days(DateTime day, int userId)
        {
            var xps = new List<int?>();
            for(int i=0; i>-7; i--)
            {
                xps.Add(GetTotalUserXPInOneDay(DateTime.Today.AddDays(i), userId));
            }

            return xps;
        }

        public IList<int?> GetUserXpInEachLast12Months(DateTime day, int userId)
        {
            var xps = new List<int?>();
            for(int i=0; i>-12; i--)
            {
                xps.Add(GetTotalUserXpInLastMounth(DateTime.Today.AddMonths(i), userId));
            }

            return xps;
        }

        public int? GetUserXpTotal(int userId)
        {
            int? sum = 0;
            var workouts =  _context.Workouts.Where(w => w.userId.Equals(userId));
            foreach (var workout in workouts)
            {
                sum += workout.XP;
            }

            return sum;
        }

    }
}