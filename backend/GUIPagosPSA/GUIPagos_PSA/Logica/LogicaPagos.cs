using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GUIPagos_PSA.Logica
{
    public class LogicaPagos
    {
        API_Pagos.API_GestionPagos _context = new API_Pagos.API_GestionPagos();

        public List<Models.Model_Pagos> listarPagos()
        {
            List<Models.Model_Pagos> listarPagos = new List<Models.Model_Pagos>();

            var pagosWS = _context.Listar();

            foreach (var pagoWS in pagosWS)
            {
                Models.Model_Pagos pago = new Models.Model_Pagos();
                pago.PagosID = pagoWS.PagosID;
                pago.CedulaIdentidad = pagoWS.CedulaIdentidad;
                pago.ServiciosID = pagoWS.ServiciosID;
                pago.FechaEmision = pagoWS.FechaEmision;
                pago.FechaVencimiento = pagoWS.FechaVencimiento;
                pago.MontoTotal = pagoWS.MontoTotal;
                pago.Estado = pagoWS.Estado;
                pago.PagosActivos = pagoWS.PagosActivos;
                pago.cod_pago = pagoWS.cod_pago;

                listarPagos.Add(pago);
            }
            return listarPagos;

        }
        public Models.Model_Pagos buscarPagosID(int id)
        {
            var pagosWS = _context.leerPorId(id);

            Models.Model_Pagos pago = new Models.Model_Pagos();

            pago.PagosID = pagosWS.PagosID;
            pago.CedulaIdentidad = pagosWS.CedulaIdentidad;
            pago.ServiciosID = pagosWS.ServiciosID;
            pago.FechaEmision = pagosWS.FechaEmision;
            pago.FechaVencimiento = pagosWS.FechaVencimiento;
            pago.MontoTotal = pagosWS.MontoTotal;
            pago.Estado = pagosWS.Estado;
            pago.PagosActivos = pagosWS.PagosActivos;
            pago.cod_pago = pagosWS.cod_pago;

            return pago;
        }

        public Models.Model_Pagos buscarPagosCedula(string cedula)
        {
            var pagosWS = _context.leerPorCedula(cedula);

            Models.Model_Pagos pago = new Models.Model_Pagos();

            pago.PagosID = pagosWS.PagosID;
            pago.CedulaIdentidad = pagosWS.CedulaIdentidad;
            pago.ServiciosID = pagosWS.ServiciosID;
            pago.FechaEmision = pagosWS.FechaEmision;
            pago.FechaVencimiento = pagosWS.FechaVencimiento;
            pago.MontoTotal = pagosWS.MontoTotal;
            pago.Estado = pagosWS.Estado;
            pago.PagosActivos = pagosWS.PagosActivos;
            pago.cod_pago = pagosWS.cod_pago;

            return pago;
        }

        public Models.Model_Pagos buscarPagosServicio(int id)
        {
            var pagosWS = _context.leerPorServicio(id);

            Models.Model_Pagos pago = new Models.Model_Pagos();

            pago.PagosID = pagosWS.PagosID;
            pago.CedulaIdentidad = pagosWS.CedulaIdentidad;
            pago.ServiciosID = pagosWS.ServiciosID;
            pago.FechaEmision = pagosWS.FechaEmision;
            pago.FechaVencimiento = pagosWS.FechaVencimiento;
            pago.MontoTotal = pagosWS.MontoTotal;
            pago.Estado = pagosWS.Estado;
            pago.PagosActivos = pagosWS.PagosActivos;
            pago.cod_pago = pagosWS.cod_pago;

            return pago;
        }

        public List<Models.Model_Pagos> listarPorEstado(bool estado)
        {
            List<Models.Model_Pagos> listarPagosEstado = new List<Models.Model_Pagos>();

            var pagosWS = _context.Listar();

            foreach (var pagoWS in pagosWS)
            {
                Models.Model_Pagos pago = new Models.Model_Pagos();
                pago.PagosID = pagoWS.PagosID;
                pago.CedulaIdentidad = pagoWS.CedulaIdentidad;
                pago.ServiciosID = pagoWS.ServiciosID;
                pago.FechaEmision = pagoWS.FechaEmision;
                pago.FechaVencimiento = pagoWS.FechaVencimiento;
                pago.MontoTotal = pagoWS.MontoTotal;
                pago.Estado = pagoWS.Estado;
                pago.PagosActivos = pagoWS.PagosActivos;
                pago.cod_pago = pagoWS.cod_pago;

                listarPagosEstado.Add(pago);
            }
            return listarPagosEstado;

        }

        public void crearPagos(Models.Model_Pagos pagos)
        {

            API_Pagos.Pagos pagoWS = new API_Pagos.Pagos();

            pagoWS.PagosID = pagos.PagosID;
            pagoWS.CedulaIdentidad = pagos.CedulaIdentidad;
            pagoWS.ServiciosID = pagos.ServiciosID;
            pagoWS.FechaEmision = pagos.FechaEmision;
            pagoWS.FechaVencimiento = pagos.FechaVencimiento;
            pagoWS.MontoTotal = pagos.MontoTotal;
            pagoWS.Estado = pagos.Estado;
            pagoWS.PagosActivos = pagos.PagosActivos;
            pagoWS.cod_pago = pagos.cod_pago;

            _context.Insertar(pagoWS);

        }

        public bool actualizarPagos(Models.Model_Pagos pagos)
        {

            API_Pagos.Pagos pagoWS = new API_Pagos.Pagos();

            pagoWS.PagosID = pagos.PagosID;
            pagoWS.CedulaIdentidad = pagos.CedulaIdentidad;
            pagoWS.ServiciosID = pagos.ServiciosID;
            pagoWS.FechaEmision = pagos.FechaEmision;
            pagoWS.FechaVencimiento = pagos.FechaVencimiento;
            pagoWS.MontoTotal = pagos.MontoTotal;
            pagoWS.Estado = pagos.Estado;
            pagoWS.PagosActivos = pagos.PagosActivos;
            pagoWS.cod_pago = pagos.cod_pago;

            _context.Actualizar(pagoWS);

            return true;
        }
        public bool eliminarPagos(int id)
        {
            _context.Eliminar(id);
            return true;

        }
    }
}