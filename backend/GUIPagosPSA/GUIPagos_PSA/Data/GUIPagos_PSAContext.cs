using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace GUIPagos_PSA.Data
{
    public class GUIPagos_PSAContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public GUIPagos_PSAContext() : base("name=GUIPagos_PSAContext")
        {
        }

        public System.Data.Entity.DbSet<GUIPagos_PSA.Models.Model_Usuarios> Model_Usuarios { get; set; }

        public System.Data.Entity.DbSet<GUIPagos_PSA.Models.Model_Pagos> Model_Pagos { get; set; }

        public System.Data.Entity.DbSet<GUIPagos_PSA.Models.Model_Servicios> Model_Servicios { get; set; }

        public System.Data.Entity.DbSet<GUIPagos_PSA.Models.Model_Notificacion> Model_Notificacion { get; set; }
    }
}
