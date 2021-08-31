# Ejemplo Dataset

Vamos a ver un ejemplo practico (Dataset de familias) de como implementar los datasets de inicio a fin.

[Crear Localización]: /es/dev-docs/packages/leemons-dataset-example/#crear-localizacion
[Crear/Actualizar campos/schema del dataset]: /es/dev-docs/packages/leemons-dataset-example/#crear-actualizar-campos-schema-del-dataset
[Recuperar Campos para renderizar el formulario]: /es/dev-docs/packages/leemons-dataset-example/#recuperar-campos-para-renderizar-el-formulario
[Manejar formulario]: /es/dev-docs/packages/leemons-dataset-example/#manejar-formulario
[Guardar valores del formulario]: /es/dev-docs/packages/leemons-dataset-example/#guardar-valores-del-formulario

1. [Crear Localización]
2. [Crear/Actualizar campos/schema del dataset]
3. [Recuperar Campos para renderizar el formulario]
4. [Manejar formulario]
5. [Guardar valores del formulario]

[guia de como añadir una localización]: /es/dev-docs/packages/leemons-dataset/#localizaciones
## Crear Localización
Si tienen dudas de que es una localización y de como añadir una mirate la [guia de como añadir una localización]

Usualmente vamos a querer añadir la localización cuando se instale nuestro plugin, para ello deberiamos irnos 
al archivo ```events.js``` en la raiz de nuestro proyecto, si no existe crealo.

Para poder añadir un dataset primero tenemos que esperar a que el plugin de dataset y multiidioma esten cargados
para que no falle la creación, sabiendo todo esto el código dentro de ```events.js``` deberia de quedar algo así.

``` js
const pluginName = 'your-plugin-name';

async function events(isInstalled) {
  if (!isInstalled) {
   
    leemons.events.once(
      [
        'plugins.dataset:pluginDidLoadServices',
        'plugins.multilanguage:pluginDidLoad'
      ],
      async () => {
        await leemons.getPlugin('dataset').services.dataset.addLocation({
          name: {
            es: 'Datos familias',
            en: 'Families data',
          },
          description: {
            es: 'Añade datos adicionales comunes a todas las familias',
            en: 'Adds additional data common to all families',
          },
          locationName: 'families-data',
          pluginName: `plugins.${pluginName}`,
        })
        leemons.events.emit('init-dataset-locations');
      }
    );
    
  } else {
    leemons.events.once(`plugins.${pluginName}:pluginDidInit`, async () => {
      leemons.events.emit('init-dataset-locations');
    });
  }
}

module.exports = events;
``` 

- **4** Solo creamos la localización si el plugin aun no esta instalado

*No instalado*

- **7-10** Especificamos los eventos a recibir para ejecutar el código de dentro de nuestra función

- **12-26** Añadimos la localización

  - **13-20** Nombre y descripción en multiidioma, es por si en algun momento existe una página donde se listen todas las localizaciones poder identificar la localización.
  - **21** Este sera el nombre de tu localización lo necesitas mas adelante para todo, crear/actualizar los schemas/datos.

*Instalado*
- **29-31** Como el plugin ya esta instalado esperamos a que se cargue y lanzamos todos los eventos que lanzariamos normalmente cuando instalamos por si algun plugin esta esperando a que nos instalemos

## Crear/Actualizar campos/schema del dataset

Antes de nada por ahora solo podran hacer este paso aquellas personas cuyo perfil tenga el permiso
```plugins.dataset.dataset``` con alguna de las siguientes acciones ```update | create | admin```

Para poder explicar esta parte vereis un ejemplo completo de frontend desde el cual se ven/añaden/actualizan/eliminan
campos del dataset.

```js

import { useMemo, useState } from 'react';

import { getDatasetSchemaRequest, removeDatasetFieldRequest } from '@dataset/request';
import { useDatasetItemDrawer } from '@dataset/components/DatasetItemDrawer';
import getDatasetAsArrayOfProperties from '@dataset/helpers/getDatasetAsArrayOfProperties';

import useTranslateLoader from '@multilanguage/useTranslateLoader';
import useCommonTranslate from '@multilanguage/helpers/useCommonTranslate';
import prefixPN from '@families/helpers/prefixPN';

import useRequestErrorMessage from '@common/useRequestErrorMessage';
import { addErrorAlert, addSuccessAlert } from '@layout/alert';
import {
  Button,
  Modal,
  PageContainer,
  PageHeader,
  Tab,
  Table,
  TabList,
  TabPanel,
  Tabs,
  useModal,
} from 'leemons-ui';

function DatasetExample() {
    
    // Define si se estan cargando los campos que hay en el dataset
    const [loading, setLoading] = useState(true);
    // Aqui se guarda el array de campos que hay en el dataset una vez a cargado
    const [tableItems, setTableItems] = useState([]);
    // Item del dataset que queremos actualizar 
    // (Si queremos crear debera estar a null)
    const [item, setItem] = useState(null);
    // Aqui se almacena el item del dataset que vamos a borrar 
    // si se acepta en la modal
    const [itemToRemove, setItemToRemove] = useState(null);
    // [0] (toggle) cierra o abre la modal del dataset
    // [1] (DatasetItemDrawer) es necesario pintarlo en el html, ya 
    // que es la modal que muestra toggle
    const [toggle, DatasetItemDrawer] = useDatasetItemDrawer();
    // Sacamos traducciones necesarias
    const [t] = useTranslateLoader(prefixPN('config_page'));
    const { t: tCommonTypes } = useCommonTranslate('form_field_types');
    // [0] (error) Mensaje de error seteado en setError
    // [1] (setError) Insertar el error
    // [2] (ErrorAlert) Componente alerta ya preparada con el error para 
    // pintarlo en el html (Solo se muestra si hay un error)
    // [3] (getErrorMessage) Función de ayuda que traduce ciertos tipos 
    // de mensajes de error devueltos por el backend, [1] la usa internamente 
    // cada vez que se le llama
    const [error, setError, ErrorAlert, getErrorMessage] = useRequestErrorMessage();
    // [0] (modal) Parametros necesarios de pasar a la componente <Modal> de leemons-ui
    // [1] (toggleModal) Modifica lo devuelto en [0] para que se muestre la modal
    const [modal, toggleModal] = useModal({
      animated: true,
      title: t('remove_modal.title'),
      message: t('remove_modal.message'),
      cancelLabel: t('remove_modal.cancel'),
      actionLabel: t('remove_modal.action'),
      // Esta funcion es llamada si pinchamos en el boton de action en la modal
      onAction: async () => {
        try {
          // Mandamos a borrar el campo del dataset
          await removeDatasetFieldRequest(`families-data`, 'plugins.families', itemToRemove.id);
          // Mostramos un alerta flotante diciendo que la acción se completado satisfactoriamente
          addSuccessAlert(t('dataset_tab.deleted_done'));
          // Recargamos los campos del dataset para que se refleje el cambio de a ver borrado un campo
          await reload();
        } catch (e) {
          // Mostramos un alerta flotante mostrando el error
          addErrorAlert(getErrorMessage(e));
        }
      },
    });
  
    // Se llama a esta funcion cada vez que queramos añadir un nuevo campo
    function newItem() {
      // Ponemos el item a null para que se cree un nuevo campo
      setItem(null);
      // Mostramos la modal de dataset
      toggle();
    }

    // Se llama a esta funcion cada vez que queramos actualizar un campo
    function openItem(item) {
      // Seteamos el campo que queremos editar
      setItem(item);
      // Mostramos la modal de dataset
      toggle();
    }

    // Se llama a esta funcion cada vez que queremos borrar un campo
    function removeItem(item) {
      // Seteamos el campo que queremos borrar
      setItemToRemove(item);
      // Mostramos la modal de confirmación
      toggleModal();
    }
  
    // La función recarga los datos del dataset volviendo a consultarlos con la bbdd
    async function reload() {
      try {
        // Marcamos como que estamos cargando los datos
        setLoading(true);
        // Pasamos lo devuelvo por load a onSuccess y si hay error llamamos a 
        // onError para simular la carga de la componente
        await onSuccess(await load());
      } catch (e) {
        onError(e);
      }
    }
  
    // Cada vez que se guarde un nuevo item en el dataset recargamos los datos
    async function onSave() {
      await reload();
    }
  
    // Preparamos los headers que se van a mostrar en la tabla
    const tableHeaders = useMemo(
      () => [
        {
          Header: t('dataset_tab.table.name'),
          accessor: (field) => (
            <div className="text-left">
              {field.schema.frontConfig.name} {field.schema.frontConfig.required ? '*' : ''}
            </div>
          ),
          className: 'text-left',
        },
        {
          Header: t('dataset_tab.table.description'),
          accessor: 'description',
          className: 'text-left',
        },
        {
          Header: t('dataset_tab.table.type'),
          accessor: (field) => (
            <div className="text-center">{tCommonTypes(field.schema.frontConfig.type)}</div>
          ),
          className: 'text-center',
        },
        {
          Header: t('dataset_tab.table.actions'),
          accessor: (field) => (
            <div className="text-center">
              {/* Boton de actualizar campo */}
              <Button color="primary" text onClick={() => openItem(field)}>
                {t('dataset_tab.table.edit')}
              </Button>
              {/* Boton de borrar campo */}
              <Button color="primary" text onClick={() => removeItem(field)}>
                {t('dataset_tab.table.delete')}
              </Button>
            </div>
          ),
          className: 'text-center',
        },
      ],
      [t, tCommonTypes]
    );
  
    // Funcion de carga, aqui tienen que ir todas las cosas asincronas
    const load = useMemo(
      () => () => getDatasetSchemaRequest(`families-data`, 'plugins.families'),
      []
    );
  
    // Se llama a esta funcion cuando la de carga termina y recibe lo devuelto por la funcion de carga
    const onSuccess = useMemo(
      () => ({ dataset }) => {
        setTableItems(getDatasetAsArrayOfProperties(dataset));
        setLoading(false);
      },
      []
    );
  
    // Se llama a esta funcion si dentro de la de carga se da algun error
    const onError = useMemo(
      () => (e) => {
        // ES: 4001 codigo de que aun no existe schema, como es posible ignoramos el error
        if (e.code !== 4001) {
          setError(e);
        }
        setLoading(false);
      },
      []
    );
    
    // Es como un useEffect(() =>{}, []) pero preparado de tal forma que si el
    // componente es desmontado mientras se ejecutaba la función de carga no se llama a
    // la de onSuccess para que react no de error de que la componente no esta montada.
    useAsync(load, onSuccess, onError);
  
    return (
      <>
        {/* Modal de error */}
        <Modal {...modal} />
        <div className="bg-primary-content">
          <PageContainer className="pt-0">
            {/* Mensaje de error */}
            <ErrorAlert />
            {!loading && !error ? (
              <div className="pt-6 mb-6 flex flex-row justify-end items-center">
                {/* Boton de añadir nuevo campo */}
                <Button color="secondary" onClick={newItem}>
                  <PlusIcon className="w-6 h-6 mr-1" />
                  {t('dataset_tab.add_field')}
                </Button>

                {/* 
                  Modal de dataset, notese que hay que pasarle la localizacion
                  creada previamente para que añada/actualice el campo en dicha localización
                 */}
                <DatasetItemDrawer
                  locationName={`families-data`}
                  pluginName="plugins.families"
                  item={item}
                  onSave={onSave}
                />
              </div>
            ) : null}
          </PageContainer>
        </div>
        {!loading && !error ? (
          <PageContainer>
            <div className="bg-primary-content p-4">
              <div>
                {tableItems && tableItems.length ? (
                    <>
                      {/* Tabla con los campos */}
                      <Table columns={tableHeaders} data={tableItems} />
                    </>
                ) : (
                  <>
                    {/* Si no hay campos para la tabla mostramos un mensaje */}
                    <div className="text-center">{t('dataset_tab.no_data_in_table')}</div>
                  </>
                )}
              </div>
            </div>
          </PageContainer>
        ) : null}
      </>
    );
}
 
 ```

En resumidas cuentas para poder **añadir/actualizar** campos tenemos que usar ```useDatasetItemDrawer```
especificando la propiedades:

- locationName="nombre-de-tu-localizacion"
- pluginName="plugins.nombre-de-tu-plugin"
- item={"null" para crear, el "item" para actualizar}
- onSave={hacer lo que quieras cuando se guarda el campo creado/actualizado}

Y para borrar tenemos que usar:

```removeDatasetFieldRequest('nombre-de-tu-localizacion', 'plugins.nombre-de-tu-plugin', itemToRemove.id);```

## Recuperar Campos para renderizar el formulario

### Backend
Primero que nada en tu plugin tienes que crearte un endpoint (protegido o no, ya depende 
de tu necesidad) desde el cual vas a recuperar el dataset a pintar 

Para esto en la carpeta del plugin tienes que crear, si no existe, el archivo ```routes.js``` dentro de la 
carpeta ```controllers``` en la raiz de tu plugin. ```(tu-plugin/controllers/routes.js)```

``` js
 module.exports = [
  {
    path: '/dataset-form',
    method: 'GET',
    handler: 'families.getDatasetForm',
    authenticated: true,
    allowedPermissions: {
      'plugins.families.families': {
        actions: ['view', 'update', 'create', 'admin'],
      },
    },
  },
];
 ```

Aqui estamos añadiendo el endpoint ```/dataset-form``` que para usarlo en el frontend tendria 
que hacerse así:

```js 
// Con todos los agentes (Todos los centros)
leemons.api({
    url: 'nombre-de-tu-plugin/dataset-form',
    allAgents: true,
})

// Con un agente (Un centro en especifico)
// En este caso es el primero que exista
import { getCentersWithToken } from '@users/session';
leemons.api('nombre-de-tu-plugin/dataset-form', {
    header: {
      Authorization: getCentersWithToken()[0].token
    }
})
```

Ahora nos haria falta crear el archivo ```families.js``` dentro de ```controllers``` carpeta y que 
este exporte la función ```getDatasetForm``` tal y como hemos especificado en el handler del endpoint.

El archivo ```families.js``` quedaria así:

``` js 
async function getDatasetForm(ctx) {
  const { compileJsonSchema, compileJsonUI } = await leemons
    .getPlugin('dataset')
    .services.dataset.getSchemaWithLocale(
      `families-data`, // Nombre de la localización
      'plugins.families', // Nombre del plugin
      ctx.state.userSession.locale, // Idioma en el que se quiere sacar el dataset
      { userSession: ctx.state.userSession } // Session actual
    );
  ctx.status = 200;
  ctx.body = { status: 200, jsonSchema: compileJsonSchema, jsonUI: compileJsonUI };
}
module.exports = { getDatasetForm };
```

**5** Nombre de la localización a sacar

**6** Nombre del plugin donde esta la localización

**7** Idioma en el que se quieren sacar los campos, si el campo no esta traducido en dicho idioma
se devolvera en el idioma de por defecto

**8** Si se especifica userSession (necesario en este caso) se comprobaran los permisos añadidos en 
cada campo del dataset, por ejemplo:

Imagina que estas pasandole a ```getSchemaWithLocale``` en ```userSession``` una sesion de un 
usuario con perfil estudiante

Y en el dataset añadiste:

- Un campo nombre donde el perfil estudiante no tenia ningun permiso.
- Un campo edad donde el estudiante solo tenia permiso de ver
- Un campo te gustan los gatos donde el estudiante tenia permiso de ver y editar

Esto acabara devolviendote los campos edad (readonly) y te gustan los gatitos, pudiendo solo editar
el de los gatitos.

### Frontend
[backend]: /es/dev-docs/packages/leemons-dataset-example/#backend
Una vez esta el endpoint del [backend] para recuperar el dataset nos queda recuperar en el fronted 
esa información y pintar el formulario

Si tienes dudas de como recuperar la información desde el frontend consulta [backend] apartado.

::: warning ATENCIÓN
Es **MUY** importante que los parametros que se le pasen a formWithTheme
varien **SOLO CUANDO ES NECESARIO**

¿Que quiere decir esto? que siempre tienes que pasarle una variable generada con un useMemo
y que este useMemo solo se ejecute cuando sea totalmente necesario.

Si no se hace así el formulario acabara haciendo un bucle infinito de cambios de estado de react
:::

``` js 
import { useMemo, useState } from 'react';
import { useAsync } from '@common/useAsync';
import formWithTheme from '@common/formWithTheme';

function DatasetForm() {

  const [datasetConfig, setDatasetConfig] = useState(null);

  // La configuración pasada siempre tiene que ir dentro de un useMemo
 const goodDatasetConfig = useMemo(() => {
    return datasetConfig;
  }, [datasetConfig]);

  // Genera el formulario para la configuracion dada
  // [0] (form) El formulario a añadir en el html
  // [1] (formActions) Multiples funciones de ayuda para validar el formulario, recuperar los datos etz
  const [form, formActions] = formWithTheme(
    goodDatasetConfig?.jsonSchema,
    goodDatasetConfig?.jsonUI,
    undefined
  );
  
  const load = useMemo(
    () => async () => {
      try {
        // Sacamos los datos del dataset, pero como puede ser que no hayan añadido ningun campo
        // es posible que pete
        const { jsonSchema, jsonUI } = await leemons.api({
            url: 'nombre-de-tu-plugin/dataset-form',
            allAgents: true,
        });
        return { jsonSchema, jsonUI };
      } catch (e) {
        return null;
      }
    },
    [router]
  );

  const onSuccess = useMemo(
    () => (data) => {
      if (data) setDatasetConfig(data);
    },[]);

  const onError = useMemo(() => (e) => {/* Tu codigo de error... */},[]);

  useAsync(load, onSuccess, onError);
  
  // Hay que pintar el form como una variable
  return (<div>{form}</div>)

}
```

Con esto deberias a ver conseguido pintar el formulario segun los permisos del usuario conectado,
felicidades ya tienes casi todo :)

## Manejar formulario
[ejemplo anterior]: /es/dev-docs/packages/leemons-dataset-example/#frontend
Dado el [ejemplo anterior] conseguimos acceso a la variable ```formActions``` mediante la creación
del formulario con ```formWithTheme```, ¿a que nos da acceso esto?

- **formActions.isLoaded()**: Devuelve true si el formulario ya ha sido creado y existe su referencia.
- **formActions.submit()**: Esto simula que intenta mandar el formulario (el formulario de dataset nunca se mandara, siempre es necesario manejar el envio de los datos programaticamente), usualmente se usa para que salgan los errores que existan en el formulario cuando necesitas validar si esta todo bien
- **formActions.getErrors()**: Devuelve los errores que existan en el formulario se deberia de hacer despues de un submit()
- **formActions.getValues()**: Devuelve los valores del formulario, es lo que necesitaras almacenar de valor para posteriormente poder cargar de nuevo los datos al formulario.
- **formActions.setValue(key, value)**: Inserta el valor para la clave especificada
- **formActions.getRef()**: Devuelve la referencia del formulario

## Guardar valores del formulario

Tenemos que crear otro endpoint para la creacion de la familia (En nuestro caso) y una vez creada 
añadir los valores del dataset

```js
async function addFamily({datasetValues}, userSession) {
    // ... Añade tu logica de validacion/creacion de tu item
  await leemons.getPlugin('dataset').services.dataset.addValues(
    'families-data',
    'plugins.families',
    datasetValues,
    userSession.userAgents,
    {target: 'tu-id-de-item'}
  );
}
```

Alfinal lo unico que necesitas hacer es llamar a ```addValues``` o ```updateValues``` en función 
de si se almacenaron valores previamente o no pasandole la clave ```target``` si es que quieres 
vincularlo a algo.

Como puedes ver hace falta pasarle los userAgents de la sesion, esto es necesario para comprobar
si la persona que esta intentando guardar dicho datos tiene acceso a guardarlos en funcion de los 
permisos configurados en cada campo del dataset.

Desde frontend solo te queda llamar a tu api pasando los datos.

## Recuperar valores del formulario

Al igual que para guardar valores te tocara hacer otro endpoint para recuperar el detalle de tus items
y en ese punto tambien tendras que recuperar los valores del dataset.

```js
async function getFamily({familyId, userSession}) {
    // ... Añade tu logica para hacer lo que necesites
  const datasetData = leemons.getPlugin('dataset').services.dataset.getValues(
      'families-data',
    'plugins.families',
    userSession.userAgents,
    {target: familyId}
  );
  
  return {datasetData /*Otro valores*/}
}
```

Como puedes ver es igual que ```addValues``` y ```updateValues``` solo que no se le pasan los 
valores y se llama ```getValues``` al igual que el add y el update hacen falta los userAgents
para solo devolver los campos a los que se tenga acceso.

Para luego pintar los valores dentro del formulario vamos a modificar un poco el ejemplo de pintar 
el formulario para pasarle los valores

``` js 
import { useMemo, useState } from 'react';
import { useAsync } from '@common/useAsync';
import formWithTheme from '@common/formWithTheme';

function DatasetForm() {

  // Usualmente sacado del header
  const id = 'la-id-de-tu-item-si-es-el-detalle';

  const [datasetConfig, setDatasetConfig] = useState(null);
  const [datasetData, setDatasetData] = useState(false);

// La configuración pasada siempre tiene que ir dentro de un useMemo
  const datasetProps = useMemo(() => ({ formData: datasetData }), [datasetData]);

  // La configuración pasada siempre tiene que ir dentro de un useMemo
 const goodDatasetConfig = useMemo(() => {
    return datasetConfig;
  }, [datasetConfig]);

  // Genera el formulario para la configuracion dada
  // [0] (form) El formulario a añadir en el html
  // [1] (formActions) Multiples funciones de ayuda para validar el formulario, recuperar los datos etz
  const [form, formActions] = formWithTheme(
    goodDatasetConfig?.jsonSchema,
    goodDatasetConfig?.jsonUI,
    undefined,
    // Le pasamos la configuracion extra al formulario normalmente el formData con 
    // los valores del formulario
    datasetProps 
  );
  
  const load = useMemo(
    () => async () => {
      const data = {};
      try {
        // Sacamos los datos del dataset, pero como puede ser que no hayan añadido ningun campo
        // es posible que pete
        const { jsonSchema, jsonUI } = await leemons.api({
            url: 'nombre-de-tu-plugin/dataset-form',
            allAgents: true,
        });
        data.dataset = { jsonSchema, jsonUI };
      } catch (e) {}
      // Si estamos consultando el detalle lo sacamos
      if (id) {
        // Sacamos el detalle del api
        data.detail = await leemons.api({
            url: `nombre-de-tu-plugin/detail/${id}`,
            allAgents: true,
        })
      }
      return data;
    },
    [router]
  );

  const onSuccess = useMemo(
    () => ({dataset, detail}) => {
      if (dataset) setDatasetConfig(dataset);
      if (detail && detail.datasetData) setDatasetData(detail.datasetData);
    },[]);

  const onError = useMemo(() => (e) => {/* Tu codigo de error... */},[]);

  useAsync(load, onSuccess, onError);
  
  // Hay que pintar el form como una variable
  return (<div>{form}</div>)

}
```
