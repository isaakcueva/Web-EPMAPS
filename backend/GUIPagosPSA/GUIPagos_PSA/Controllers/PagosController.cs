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
    public class PagosController : Controller
    {
        LogicaPagos pagosDB = new LogicaPagos();

        // GET: Pagos
        public ActionResult Index()
        {
            return View(pagosDB.listarPagos());
        }

        // GET: Pagos/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            int idNotNull = id.Value;
            Model_Pagos model_Pagos = pagosDB.buscarPagosID(idNotNull);
            if (model_Pagos == null)
            {
                return HttpNotFound();
            }
            return View(model_Pagos);
        }

        // GET: Pagos/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Pagos/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "PagosID,CedulaIdentidad,ServiciosID,FechaEmision,FechaVencimiento,MontoTotal,Estado,PagosActivos,cod_pago")] Model_Pagos model_Pagos)
        {
            if (ModelState.IsValid)
            {
                pagosDB.crearPagos(model_Pagos);
                return RedirectToAction("Index");
            }

            return View(model_Pagos);
        }

        // GET: Pagos/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            int idNotNull = id.Value;
            Model_Pagos model_Pagos = pagosDB.buscarPagosID(idNotNull);
            if (model_Pagos == null)
            {
                return HttpNotFound();
            }
            return View(model_Pagos);
        }

        // POST: Pagos/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "PagosID,CedulaIdentidad,ServiciosID,FechaEmision,FechaVencimiento,MontoTotal,Estado,PagosActivos,cod_pago")] Model_Pagos model_Pagos)
        {
            if (ModelState.IsValid)
            {
                pagosDB.actualizarPagos(model_Pagos);
                return RedirectToAction("Index");
            }
            return View(model_Pagos);
        }

        // GET: Pagos/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            int idNotNull = id.Value;
            Model_Pagos model_Pagos = pagosDB.buscarPagosID(idNotNull);
            if (model_Pagos == null)
            {
                return HttpNotFound();
            }
            return View(model_Pagos);
        }

        // POST: Pagos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
           pagosDB.eliminarPagos(id);
            return RedirectToAction("Index");
        }

    }
}
