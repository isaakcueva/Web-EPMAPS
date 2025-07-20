using GUIPagos_PSA.API_Usuarios;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GUIPagos_PSA.Logica
{
    public class LogicaUsuarios
    {
        API_Usuarios.API_GestionUsuarios _context = new API_Usuarios.API_GestionUsuarios();
         
        public List<Models.Model_Usuarios> listarUsuarios()
        {
            List<Models.Model_Usuarios> listarUsuarios = new List<Models.Model_Usuarios>();

            var usuariosWS = _context.Listar();

            foreach ( var usuarioWS in usuariosWS)
            {
                Models.Model_Usuarios usuario = new Models.Model_Usuarios();
                usuario.CedulaIdentidad = usuarioWS.CedulaIdentidad;
                usuario.Nombre = usuarioWS.Nombre;
                usuario.Direccion= usuarioWS.Direccion;
                usuario.Email= usuarioWS.Email;
                usuario.Telefono= usuarioWS.Telefono;
                usuario.UsuarioActivo=usuarioWS.UsuarioActivo;

                listarUsuarios.Add(usuario);
            }
            return listarUsuarios;
        }

        public Models.Model_Usuarios buscarUsuario(string cedula)
        {
            var usuarioWS = _context.leerPorId(cedula);

            Models.Model_Usuarios usuario = new Models.Model_Usuarios();

            usuario.CedulaIdentidad = usuarioWS.CedulaIdentidad;
            usuario.Nombre = usuarioWS.Nombre;
            usuario.Direccion = usuarioWS.Direccion;
            usuario.Email = usuarioWS.Email;
            usuario.Telefono = usuarioWS.Telefono;
            usuario.UsuarioActivo = usuarioWS.UsuarioActivo;

            return usuario; 
        }

        public void crearUsuario(Models.Model_Usuarios usuario)
        {

            API_Usuarios.Usuarios usuarioWS = new API_Usuarios.Usuarios();

            usuarioWS.CedulaIdentidad = usuario.CedulaIdentidad;
            usuarioWS.Nombre = usuario.Nombre;
            usuarioWS.Direccion = usuario.Direccion;
            usuarioWS.Email = usuario.Email;
            usuarioWS.Telefono = usuario.Telefono;
            usuarioWS.UsuarioActivo = usuario.UsuarioActivo;

            _context.Insertar(usuarioWS);
           
        }

        public bool actualizarUsuario(Models.Model_Usuarios usuario)
        {

            API_Usuarios.Usuarios usuarioWS = new API_Usuarios.Usuarios();

            usuarioWS.CedulaIdentidad = usuario.CedulaIdentidad;
            usuarioWS.Nombre = usuario.Nombre;
            usuarioWS.Direccion = usuario.Direccion;
            usuarioWS.Email = usuario.Email;
            usuarioWS.Telefono = usuario.Telefono;
            usuarioWS.UsuarioActivo = usuario.UsuarioActivo;

            _context.Actualizar (usuarioWS);

            return true;
        }
        public bool eliminarUsuario(string cedula)
        {
            _context.Eliminar(cedula);
            return true;
        }




    }
}