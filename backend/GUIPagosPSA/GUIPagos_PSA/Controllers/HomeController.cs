using GUIPagos_PSA.Logica;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;


namespace GUIPagos_PSA.Controllers
{
    public class HomeController : Controller
    {
        LogicaUsuarios logicaUsuarios = new LogicaUsuarios();
        LogicaPagos logicaPagos = new LogicaPagos();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Cart() { return View(); }


        [HttpPost]
        public ActionResult GuardarCompra(string zapatosData, string subtotalData, string cedula)
        {
            // Obtener la cédula del localStorage
            // string cedula = System.Web.HttpContext.Current.Session["cedula"] as string;




            if (string.IsNullOrEmpty(cedula))
            {
                // Manejar el caso en que no se haya guardado la cédula en el localStorage
                return Json(new { success = false, message = "No se encontró la cédula en el localStorage" });
            }
            else
            {
                var usuario = logicaUsuarios.buscarUsuario(cedula);
                if (usuario == null)
                {
                    // Manejar el caso en que no se haya encontrado el estudiante
                    return Json(new { success = false, message = "No se encontró el estudiante con la cédula proporcionada" });
                }
            }

            // Deserializar los datos del carrito
            var pagos = JsonConvert.DeserializeObject<List<Models.Model_Pagos>>(zapatosData);
            decimal subtotal = Convert.ToDecimal(subtotalData);

            // Crear una lista para almacenar los pagos
            List<Models.Model_Pagos> pagosGuardados = new List<Models.Model_Pagos>();

            // Crear un nuevo pago para cada elemento del carrito
            foreach (var pago in pagos)
            {
                // Asignar la cédula al pago
                pago.CedulaIdentidad = cedula;
                pago.ServiciosID = 1;
                pago.FechaEmision = System.DateTime.Now; // Asignar la fecha actual
                pago.FechaVencimiento = System.DateTime.Now.AddYears(1);
                pago.Estado = "pendiente"; // Estado quemado como pendiente, puedes cambiarlo según tus necesidades
                                           // Agregar el pago a la lista de pagos guardados
                logicaPagos.crearPagos(pago);
                pagosGuardados.Add(pago);
            }


            // Devolver una respuesta al cliente si es necesario
            return Json(new { success = true, message = "Compra guardada correctamente", pagos = pagosGuardados });

        }
    }
}