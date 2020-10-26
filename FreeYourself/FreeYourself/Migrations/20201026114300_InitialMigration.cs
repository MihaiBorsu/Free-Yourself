using Microsoft.EntityFrameworkCore.Migrations;

namespace FreeYourself.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(nullable: true),
                    teamStatus = table.Column<string>(nullable: true),
                    teamName = table.Column<string>(nullable: true),
                    xp = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true),
                    teamBase = table.Column<string>(nullable: true),
                    adminId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Teams_Users_adminId",
                        column: x => x.adminId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "VehicleDocuments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    serialNumber = table.Column<int>(nullable: false),
                    ownerId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VehicleDocuments_Users_ownerId",
                        column: x => x.ownerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Workouts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    totalKm = table.Column<int>(nullable: false),
                    dailyKm = table.Column<int>(nullable: false),
                    difficultyLevel = table.Column<int>(nullable: false),
                    numberOfConsecutiveDays = table.Column<int>(nullable: false),
                    participantId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workouts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Workouts_Users_participantId",
                        column: x => x.participantId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Teams_adminId",
                table: "Teams",
                column: "adminId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleDocuments_ownerId",
                table: "VehicleDocuments",
                column: "ownerId");

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_participantId",
                table: "Workouts",
                column: "participantId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "VehicleDocuments");

            migrationBuilder.DropTable(
                name: "Workouts");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
