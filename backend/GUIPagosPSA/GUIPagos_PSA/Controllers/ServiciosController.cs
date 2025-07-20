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
    public class ServiciosController : Controller
    {
        LogicaServicios serviciosDB = new LogicaServicios();

        // GET: Servicios
        public ActionResult Index()
        {
            return View(serviciosDB.listarServicios());
        }

        // GET: Servicios/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            int idNotNull = id.Value;
            Model_Servicios model_Servicios = serviciosDB.buscarServiciosID(idNotNull);
            if (model_Servicios == null)
            {
                return HttpNotFound();
            }
            return View(model_Servicios);
        }

        // GET: Servicios/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Servicios/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ServiciosID,Descripcion,MontoServicio,ServicioActivo")] Model_Servicios model_Servicios)
        {
            if (ModelState.IsValid)
            {
                serviciosDB.crearServicios(model_Servicios);
                return RedirectToAction("Index");
            }

            return View(model_Servicios);
        }

        // GET: Servicios/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            int idNotNull = id.Value;
            Model_Servicios model_Servicios = serviciosDB.buscarServiciosID(idNotNull);
            if (model_Servicios == null)
            {
                return HttpNotFound();
            }
            return View(model_Servicios);
        }

        // POST: Servicios/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ServiciosID,Descripcion,MontoServicio,ServicioActivo")] Model_Servicios model_Servicios)
        {
            if (ModelState.IsValid)
            {
                serviciosDB.actualizarServicios(model_Servicios);
                return RedirectToAction("Index");
            }
            return View(model_Servicios);
        }

        // GET: Servicios/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            int idNotNull = id.Value;
            Model_Servicios model_Servicios = serviciosDB.buscarServiciosID(idNotNull);
            if (model_Servicios == null)
            {
                return HttpNotFound();
            }
            return View(model_Servicios);
        }

        // POST: Servicios/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            serviciosDB.eliminarServicios(id);
            return RedirectToAction("Index");
        }

    }
}
