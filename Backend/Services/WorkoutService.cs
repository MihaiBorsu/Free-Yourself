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

    }
}