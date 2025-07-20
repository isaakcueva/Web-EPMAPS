using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GUIPagos_PSA.Models
{
    public class Model_Notificacion
    {
        [Key]
        [Required]
        public int NotificacionID { get; set; }
        public string CedulaIdentidad { get; set; }
        public string Descripcion { get; set; }
        public Nullable<System.DateTime> FechaRegistro { get; set; }
        public string EstadoNotificacion { get; set; }
        public string ComentariosResolucion { get; set; }
        public Nullable<bool> NotificacionActiva { get; set; }

        public virtual Model_Usuarios Usuarios { get; set; }

    }
}