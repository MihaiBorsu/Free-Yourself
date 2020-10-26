﻿// <auto-generated />
using System;
using FreeYourself.DataAccessLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FreeYourself.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FreeYourself.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("adminId")
                        .HasColumnType("int");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("teamBase")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("adminId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("FreeYourself.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("teamName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("teamStatus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("username")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("xp")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("FreeYourself.Models.VehicleDocument", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ownerId")
                        .HasColumnType("int");

                    b.Property<int>("serialNumber")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ownerId");

                    b.ToTable("VehicleDocuments");
                });

            modelBuilder.Entity("FreeYourself.Models.Workout", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("dailyKm")
                        .HasColumnType("int");

                    b.Property<int>("difficultyLevel")
                        .HasColumnType("int");

                    b.Property<int>("numberOfConsecutiveDays")
                        .HasColumnType("int");

                    b.Property<int?>("participantId")
                        .HasColumnType("int");

                    b.Property<int>("totalKm")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("participantId");

                    b.ToTable("Workouts");
                });

            modelBuilder.Entity("FreeYourself.Models.Team", b =>
                {
                    b.HasOne("FreeYourself.Models.User", "admin")
                        .WithMany()
                        .HasForeignKey("adminId");
                });

            modelBuilder.Entity("FreeYourself.Models.VehicleDocument", b =>
                {
                    b.HasOne("FreeYourself.Models.User", "owner")
                        .WithMany()
                        .HasForeignKey("ownerId");
                });

            modelBuilder.Entity("FreeYourself.Models.Workout", b =>
                {
                    b.HasOne("FreeYourself.Models.User", "participant")
                        .WithMany()
                        .HasForeignKey("participantId");
                });
#pragma warning restore 612, 618
        }
    }
}
