using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace Insurance.Data
{
    public class CustomerClass : DbContext
    {
        public CustomerClass(DbContextOptions<CustomerClass> options) :base(options){}

        public DbSet<SetupCustomer> SetupCustomer { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer();
            base.OnConfiguring(optionsBuilder);
        }
    }
}
