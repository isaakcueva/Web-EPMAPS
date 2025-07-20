using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GUIPagos_PSA.Logica
{
    public class LogicaServicios
    {
        API_Servicios.API_GestionServicios _context = new API_Servicios.API_GestionServicios();

        public List<Models.Model_Servicios> listarServicios()
        {
            List<Models.Model_Servicios> listarServicios = new List<Models.Model_Servicios>();

            var ServiciosWS = _context.Listar();

            foreach (var servicioWS in ServiciosWS)
            {
                Models.Model_Servicios servicio = new Models.Model_Servicios();
                servicio.ServiciosID = servicioWS.ServiciosID;
                servicio.Descripcion = servicioWS.Descripcion;
                servicio.MontoServicio = servicioWS.MontoServicio;
                servicio.ServicioActivo = servicioWS.ServicioActivo;


                listarServicios.Add(servicio);
            }
            return listarServicios;
        }
        public List<Models.Model_Servicios> listarPorEstado(bool estado)
        {
            List<Models.Model_Servicios> listarServiciosEstado = new List<Models.Model_Servicios>();

            var ServiciosWS = _context.Listar();

            foreach (var servicioWS in ServiciosWS)
            {
                Models.Model_Servicios servicio = new Models.Model_Servicios();
                servicio.ServiciosID = servicioWS.ServiciosID;
                servicio.Descripcion = servicioWS.Descripcion;
                servicio.MontoServicio = servicioWS.MontoServicio;
                servicio.ServicioActivo = servicioWS.ServicioActivo;


                listarServiciosEstado.Add(servicio);
            }
            return listarServiciosEstado;

        }
        public Models.Model_Servicios buscarServiciosID(int id)
        {
            var servicioWS = _context.leerPorId(id);

            Models.Model_Servicios servicio = new Models.Model_Servicios();

            servicio.ServiciosID = servicioWS.ServiciosID;
            servicio.Descripcion = servicioWS.Descripcion;
            servicio.MontoServicio = servicioWS.MontoServicio;
            servicio.ServicioActivo = servicioWS.ServicioActivo;

            return servicio;
        }

        public void crearServicios(Models.Model_Servicios servicio)
        {

            API_Servicios.Servicios servicioWS = new API_Servicios.Servicios();

            servicio.ServiciosID = servicioWS.ServiciosID;
            servicio.Descripcion = servicioWS.Descripcion;
            servicio.MontoServicio = servicioWS.MontoServicio;
            servicio.ServicioActivo = servicioWS.ServicioActivo;

            _context.Insertar(servicioWS);

        }

        public bool actualizarServicios(Models.Model_Servicios servicio)
        {

            API_Servicios.Servicios servicioWS = new API_Servicios.Servicios();

            servicio.ServiciosID = servicioWS.ServiciosID;
            servicio.Descripcion = servicioWS.Descripcion;
            servicio.MontoServicio = servicioWS.MontoServicio;
            servicio.ServicioActivo = servicioWS.ServicioActivo;

            _context.Actualizar(servicioWS);

            return true;
        }
        public bool eliminarServicios(int id)
        {
            _context.Eliminar(id);
            return true;

        }
    }
}