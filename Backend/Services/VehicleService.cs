using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
// using WebApi.Helpers.DataContext;

namespace WebApi.Services
{
    public interface IVehicleService
    {
        IEnumerable<Vehicle> GetAll();
        Vehicle GetById(int id);
        Vehicle Create(Vehicle vehicle);
        void Update(Vehicle vehicle);
        void Delete(int id);
    }

    public class VehicleService : IVehicleService
    {
        private DataContext _context;

        public VehicleService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Vehicle> GetAll()
        {
            return _context.Vehicles;
        }

        public Vehicle GetById(int id)
        {
            return _context.Vehicles.Find(id);
        }

        public Vehicle Create(Vehicle vehicle)
        {
            // validation
            if (_context.Vehicles.Any(x => x.SerialNumber == vehicle.SerialNumber))
                throw new AppException("Serial NUmber \"" + vehicle.SerialNumber + "\" is already register in the database");


            _context.Vehicles.Add(vehicle);
            _context.SaveChanges();

            return vehicle;
        }

        public void Update(Vehicle vehicleParam)
        {
            var vehicle = _context.Vehicles.Find(vehicleParam.Id);

            if (vehicle == null)
                throw new AppException("Vehicle not found");

            // update serial number if it has changed
            if (!string.IsNullOrWhiteSpace(vehicleParam.SerialNumber) && vehicleParam.SerialNumber != vehicle.SerialNumber)
            {
                // throw error if the new serial_numver is already taken
                if (_context.Vehicles.Any(x => x.SerialNumber == vehicleParam.SerialNumber))
                    throw new AppException("Serial Number " + vehicleParam.SerialNumber + " is already taken");

                vehicle.SerialNumber = vehicleParam.SerialNumber;
            }

            // update vehicle properties if provided
            if (!string.IsNullOrWhiteSpace(vehicleParam.Country))
                vehicle.Country = vehicleParam.Country;

            if (!string.IsNullOrWhiteSpace(vehicleParam.City))
                vehicle.City = vehicleParam.City;

            if (!string.IsNullOrWhiteSpace(vehicleParam.Date))
                vehicle.Date = vehicleParam.Date;

            if (!string.IsNullOrWhiteSpace(vehicleParam.ProfileContact))
                vehicle.ProfileContact = vehicleParam.ProfileContact;

            if (!string.IsNullOrWhiteSpace(vehicleParam.Description))
                vehicle.Description = vehicleParam.Description;

            _context.Vehicles.Update(vehicle);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var vehicle = _context.Vehicles.Find(id);
            if (vehicle != null)
            {
                _context.Vehicles.Remove(vehicle);
                _context.SaveChanges();
            }
        }

    }
}