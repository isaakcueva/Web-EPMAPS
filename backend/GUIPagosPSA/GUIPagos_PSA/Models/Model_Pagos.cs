using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GUIPagos_PSA.Models
{
    public class Model_Pagos
    {
        [Key]
        [Required]
        public int PagosID { get; set; }
        public string CedulaIdentidad { get; set; }
        public Nullable<int> ServiciosID { get; set; }
        public Nullable<System.DateTime> FechaEmision { get; set; }
        public Nullable<System.DateTime> FechaVencimiento { get; set; }
        [JsonProperty("precio")] // Nombre en el JSON
        public Nullable<decimal> MontoTotal { get; set; }
        public string Estado { get; set; }
        public Nullable<bool> PagosActivos { get; set; }
        public string cod_pago { get; set; }

        public virtual Model_Servicios Servicios { get; set; }
        public virtual Model_Servicios Usuarios { get; set; }
    }
}