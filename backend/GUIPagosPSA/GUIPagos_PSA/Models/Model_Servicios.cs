using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace GUIPagos_PSA.Models
{
    public class Model_Servicios
    {
        [Key]
        [Required]
        public int ServiciosID { get; set; }
        public string Descripcion { get; set; }
        public Nullable<decimal> MontoServicio { get; set; }
        public Nullable<bool> ServicioActivo { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual List<Model_Pagos> Pagos { get; set; }
    }
}