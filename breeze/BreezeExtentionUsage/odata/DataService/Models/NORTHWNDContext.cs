using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using DataService.Models.Mapping;

namespace DataService.Models
{
    public partial class NORTHWNDContext : DbContext {
        static NORTHWNDContext() {
            Database.SetInitializer<NORTHWNDContext>(null);
        }

        public NORTHWNDContext()
            : base("Name=NORTHWNDContext") { }


        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            modelBuilder.Configurations.Add(new CategoryMap());
            modelBuilder.Configurations.Add(new ProductMap());
            modelBuilder.Configurations.Add(new SupplierMap());
        }
    }
}
