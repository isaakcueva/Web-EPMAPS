using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using GUIPagos_PSA.Data;
using GUIPagos_PSA.Logica;
using GUIPagos_PSA.Models;

namespace GUIPagos_PSA.Controllers
{
    public class NotificacionController : Controller
    {
        LogicaNotificaciones notificacionesDB = new LogicaNotificaciones();

        // GET: Notificacion
        public ActionResult Index()
        {
            var model_Notificacion = notificacionesDB.listarNotificaciones();
            return View(model_Notificacion.ToList());
        }

        // GET: Notificacion/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            int idNotNull = id.Value;
            Model_Notificacion model_Notificacion = notificacionesDB.buscarNotificacionesID(idNotNull);
            if (model_Notificacion == null)
            {
                return HttpNotFound();
            }
            return View(model_Notificacion);
        }

        // GET: Notificacion/Create
        public ActionResult Create()
        {
            
            return View();
        }

        // POST: Notificacion/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "NotificacionID,CedulaIdentidad,Descripcion,FechaRegistro,EstadoNotificacion,ComentariosResolucion,NotificacionActiva")] Model_Notificacion model_Notificacion)
        {
            if (ModelState.IsValid)
            {
                notificacionesDB.crearNotificacion(model_Notificacion);
                return RedirectToAction("Index");
            }

            
            return View(model_Notificacion);
        }

        // GET: Notificacion/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            int idNotNull = id.Value;
            Model_Notificacion model_Notificacion = notificacionesDB.buscarNotificacionesID(idNotNull);
            if (model_Notificacion == null)
            {
                return HttpNotFound();
            }
            
            return View(model_Notificacion);
        }

        // POST: Notificacion/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "NotificacionID,CedulaIdentidad,Descripcion,FechaRegistro,EstadoNotificacion,ComentariosResolucion,NotificacionActiva")] Model_Notificacion model_Notificacion)
        {
            if (ModelState.IsValid)
            {
                notificacionesDB.actualizarNotificacion(model_Notificacion);
                return RedirectToAction("Index");
            }
            
            return View(model_Notificacion);
        }

        // GET: Notificacion/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            int idNotNull = id.Value;
            Model_Notificacion model_Notificacion = notificacionesDB.buscarNotificacionesID(idNotNull);
            if (model_Notificacion == null)
            {
                return HttpNotFound();
            }
            return View(model_Notificacion);
        }

        // POST: Notificacion/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            notificacionesDB.eliminarNotificacion(id);
            return RedirectToAction("Index");
        }
    }
}
