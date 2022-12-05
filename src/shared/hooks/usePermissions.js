import { ROUTES } from '../../data/routes';
import env from '../../env';

export const usePermissions = (permissions) => {
  let opciones = [];
  let allowedRoutes = [];
  
  Object.entries(ROUTES).forEach((entry) => {
    allowedRoutes.push(entry[1]);
  })

  permissions.forEach((permiso) => {
    if(permiso.id == env.idAppMovil){
      permiso.opciones.forEach((opcion) => {
        if(allowedRoutes.includes(opcion.url)){
          let permisosOpcion = {
            name: '',
            url: '',
            id: 0,
            icon: '',
            permissions: []
          };
          permisosOpcion.name = opcion.nombre;
          permisosOpcion.url = opcion.url;
          permisosOpcion.icon = opcion.icono_menu??'';
          permisosOpcion.id = opcion.id;
          opcion.permisos.forEach((opcPermisos) => {
            if(opcPermisos.permitido){
              permisosOpcion.permissions.push({title: opcPermisos.titulo})
            }
          })
          opciones.push(permisosOpcion);
        }
      })
    }
  })
  return {opciones};
}