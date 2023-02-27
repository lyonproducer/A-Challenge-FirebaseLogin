# Reto de Programación
*Helgen Technologies*

## Descripción
Se desea contar con un mapa para visualizar la posición de los autobuses por un operador de transportes públicos de Dublin, Irlanda que es encargado de levantar incidentes de anomalías en en viajes de los autobuses. Dicha aplicación debe permitir el acceso seguro al operador y permitir activar la visualización de los autobuses con los que se cuentan datos.

Requerimientos Funcionales:
* Una pantalla de Login visible para cualquier usuario.
* Una pantalla Visualizador del Mapa visible únicamente para usuario operador.
* Capacidad de ver vehículos disponibles a visualizar.
* Capacidad de activar o desactivar la visualización de los vehículos individuales.

Requerimientos No Funcionales:
* Un icono o imagen para visualizar el vehículo.
* No es necesario gráficos avanzados de rotación, etc.
* Soportar resolución de pantalla de escritorio 1024x768.
* Un usuario operador con credenciales de acceso asignadas.
* Un nivel de zoom entre 15 a 16 para visualizar los camiones en el mapa.
* No hay restricción de como determinar que dato representa la posición a dibujar. Una propuesta sería tomar la posición del autobus de aquel dato más cercano en tiempo (Hora:Segundo) a la hora local.

Descripción de los datos:
* Los datos con los que se cuentan son de 5 autobuses en un día de enero del 2013. Estos autobuses están identificados por ID's distintos: "43073", "38087", "40037", "38065", "33485".
* Se cuenta con 2 archivos csv: "one_bus.csv" y "many_bus.csv". "one_bus.csv" contiene únicamente las entradas para el autobús "43073"; "many_bus.csv" tiene registros de todos los autobuses.
* Las columnas en el csv son: DataEntryID, Date, Time, Latitude, Longitude, VehicleID.
* Fuente: [Dublin Bus GPS Dataset 01/01/2013](https://data.gov.ie/dataset/dublin-bus-gps-sample-data-from-dublin-city-council-insight-project/resource/00c65697-9ed6-43cb-a2b7-9e20cf323cb3)


## Instrucciones de Entrega
* Comparte tu proyecto en un repositorio público de GitHub con tu cuenta personal.
* Procura documentar en el README las instrucciones para replicar localmente.
* Para este proyecto es requirido usar Angular.
* Eres libre de elegir cualquier otra tecnología adicional para completar la tarea.
* Se evaluará la capacidad de tomar decisiones técnicas y justificarlas.
* Funcionalidades adicionales son aceptadas procurando completar primero las solicitadas a menos que se considere crítico.
* Tiempo para realizarlo: 1 semana.

### ¡Diviertete!