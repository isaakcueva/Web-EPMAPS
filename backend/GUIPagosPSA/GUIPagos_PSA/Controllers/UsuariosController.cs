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
using PagedList;
using PagedList.Mvc;

namespace GUIPagos_PSA.Controllers
{
    public class UsuariosController : Controller
    {
        LogicaUsuarios usuarioDB = new LogicaUsuarios();

        // GET: Usuarios
        public ActionResult Index(int? page)
        {
            return View(usuarioDB.listarUsuarios());
        }

        // GET: Usuarios/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Model_Usuarios model_Usuarios = usuarioDB.buscarUsuario(id);
            if (model_Usuarios == null)
            {
                return HttpNotFound();
            }
            return View(model_Usuarios);
        }

        // GET: Usuarios/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Usuarios/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "CedulaIdentidad,Nombre,Direccion,Email,Telefono,UsuarioActivo")] Model_Usuarios model_Usuarios)
        {
            if (ModelState.IsValid)
            {
                usuarioDB.crearUsuario(model_Usuarios);
                return RedirectToAction("Index");
            }

            return View(model_Usuarios);
        }

        // GET: Usuarios/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Model_Usuarios model_Usuarios = usuarioDB.buscarUsuario(id);
            if (model_Usuarios == null)
            {
                return HttpNotFound();
            }
            return View(model_Usuarios);
        }

        // POST: Usuarios/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "CedulaIdentidad,Nombre,Direccion,Email,Telefono,UsuarioActivo")] Model_Usuarios model_Usuarios)
        {
            if (ModelState.IsValid)
            {
                usuarioDB.actualizarUsuario(model_Usuarios);
                return RedirectToAction("Index");
            }
            return View(model_Usuarios);
        }

        // GET: Usuarios/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Model_Usuarios model_Usuarios = usuarioDB.buscarUsuario(id);
            if (model_Usuarios == null)
            {
                return HttpNotFound();
            }
            return View(model_Usuarios);
        }

        // POST: Usuarios/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            
            usuarioDB.eliminarUsuario(id);
            return RedirectToAction("Index");
        }

    }
}
