using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Activity> Activities { get; set; } //Activities is table name
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ActivityAttendee>(z => z.HasKey(s => new {s.AppUserId,s.ActivityId}));

            builder.Entity<ActivityAttendee>()
                   .HasOne(u => u.AppUser)
                   .WithMany(a => a.Activities)
                   .HasForeignKey(z => z.AppUserId);

            builder.Entity<ActivityAttendee>()
                    .HasOne(u => u.Activity)
                    .WithMany(a => a.Attendees)
                    .HasForeignKey(z => z.ActivityId);
        }
    }
}
