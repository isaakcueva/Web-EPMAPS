using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GUIPagos_PSA.Logica
{
    public class LogicaNotificaciones
    {
        API_Notificaciones.API_GestionNotificaciones _context = new API_Notificaciones.API_GestionNotificaciones();

        public List<Models.Model_Notificacion> listarNotificaciones()
        {
            List<Models.Model_Notificacion> listarNotificaciones = new List<Models.Model_Notificacion>();

            var NotificacionesWS = _context.Listar();

            foreach (var notificacionWS in NotificacionesWS)
            {
                Models.Model_Notificacion notificacion = new Models.Model_Notificacion();
                notificacion.NotificacionID = notificacionWS.NotificacionID;
                notificacion.CedulaIdentidad = notificacionWS.CedulaIdentidad;
                notificacion.Descripcion = notificacionWS.Descripcion;
                notificacion.FechaRegistro = notificacionWS.FechaRegistro;
                notificacion.EstadoNotificacion = notificacionWS.EstadoNotificacion;
                notificacion.ComentariosResolucion = notificacionWS.ComentariosResolucion;
                notificacion.NotificacionActiva = notificacionWS.NotificacionActiva;


                listarNotificaciones.Add(notificacion);
            }
            return listarNotificaciones;
        }
        public List<Models.Model_Notificacion> listarPorEstado(bool estado)
        {
            List<Models.Model_Notificacion> listarNotificacionesEstado = new List<Models.Model_Notificacion>();

            var NotificacionesWS = _context.Listar();

            foreach (var notificacionWS in NotificacionesWS)
            {
                Models.Model_Notificacion notificacion = new Models.Model_Notificacion();
                notificacion.NotificacionID = notificacionWS.NotificacionID;
                notificacion.CedulaIdentidad = notificacionWS.CedulaIdentidad;
                notificacion.Descripcion = notificacionWS.Descripcion;
                notificacion.FechaRegistro = notificacionWS.FechaRegistro;
                notificacion.EstadoNotificacion = notificacionWS.EstadoNotificacion;
                notificacion.ComentariosResolucion = notificacionWS.ComentariosResolucion;
                notificacion.NotificacionActiva = notificacionWS.NotificacionActiva;


                listarNotificacionesEstado.Add(notificacion);
            }
            return listarNotificacionesEstado;

        }
        public Models.Model_Notificacion buscarNotificacionesID(int id)
        {
            var notificacionWS = _context.leerPorId(id);

            Models.Model_Notificacion notificacion = new Models.Model_Notificacion();

            notificacion.NotificacionID = notificacionWS.NotificacionID;
            notificacion.CedulaIdentidad = notificacionWS.CedulaIdentidad;
            notificacion.Descripcion = notificacionWS.Descripcion;
            notificacion.FechaRegistro = notificacionWS.FechaRegistro;
            notificacion.EstadoNotificacion = notificacionWS.EstadoNotificacion;
            notificacion.ComentariosResolucion = notificacionWS.ComentariosResolucion;
            notificacion.NotificacionActiva = notificacionWS.NotificacionActiva;

            return notificacion;
        }

        public void crearNotificacion(Models.Model_Notificacion notificacion)
        {

            API_Notificaciones.Notificacion notificacionWS = new API_Notificaciones.Notificacion();

            notificacion.NotificacionID = notificacionWS.NotificacionID;
            notificacion.CedulaIdentidad = notificacionWS.CedulaIdentidad;
            notificacion.Descripcion = notificacionWS.Descripcion;
            notificacion.FechaRegistro = notificacionWS.FechaRegistro;
            notificacion.EstadoNotificacion = notificacionWS.EstadoNotificacion;
            notificacion.ComentariosResolucion = notificacionWS.ComentariosResolucion;
            notificacion.NotificacionActiva = notificacionWS.NotificacionActiva;

            _context.Insertar(notificacionWS);

        }

        public bool actualizarNotificacion(Models.Model_Notificacion notificacion)
        {

            API_Notificaciones.Notificacion notificacionWS = new API_Notificaciones.Notificacion();

            notificacion.NotificacionID = notificacionWS.NotificacionID;
            notificacion.CedulaIdentidad = notificacionWS.CedulaIdentidad;
            notificacion.Descripcion = notificacionWS.Descripcion;
            notificacion.FechaRegistro = notificacionWS.FechaRegistro;
            notificacion.EstadoNotificacion = notificacionWS.EstadoNotificacion;
            notificacion.ComentariosResolucion = notificacionWS.ComentariosResolucion;
            notificacion.NotificacionActiva = notificacionWS.NotificacionActiva;

            _context.Actualizar(notificacionWS);

            return true;
        }
        public bool eliminarNotificacion(int id)
        {
            _context.Eliminar(id);
            return true;

        }
    }
}