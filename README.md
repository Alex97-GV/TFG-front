# Web Scrapping Front
Este proyecto es una aplicación web desarrollada en Angular. Consiste en el desarrollo front para un Trabajo de Fin de Grado. Consiste en la implementación de una aplicación en formato red social, diseñada para incentivar la colaboración entre usuarios en el ámbito académico y de investigación, permitiendo facilitar la interacción y el intercambio de conocimientos entre investigadores tanto experimentados como primerizos, promoviendo así la creación de redes de colaboración científica. Para un uso correcto y completo de la aplicación es necesario tener levantado el proyecto backend de la aplicación.

## Requisitos
Antes de empezar, asegúrate de tener instalados los siguientes requisitos:
- Node.js (https://nodejs.org/) (>= 14.x).
- Angular CLI (https://angular.io/cli) (>= 15.x). En caso de tener VSCode, podemos abrir la consola e introducir el comando: npm install –g @angular/cli

## Instalación
Sigue estos pasos para instalar el proyecto: 
1. Clonar el respositorio (para ello es necesario tener instalado previamente la extensión bash en nuestro IDE, por ejemplo en VSCode).
   git clone https://github.com/Alex97-GV/TFG-front.git
2. Abre el proyecto o navega al directorio del proyecto:
   cd TFG-front.git
3. Instala las dependencias
   npm install

## Uso
Para iniciar la aplicación en modo desarrollo, ejecuta:
  ng serve
Para construir el proyecto para producción, ejecuta:
  ng build --prod

## POSIBLES PROBLEMAS ##
Si nos dice que no puede encontrar un módulo del @angular/cli, puede ser porque no se haya instalado bien las dependecias del node_modules. Para solucionarlo:
- Incluir un @angular/compiler-cli con una versión compatible.
- Una vez hecho esto, procedemos a eliminar nuestro node_modules con el comando rm –r node_modules (estando dentro de la carpeta de nuestro proyecto).
- Limpiamos cache por si acaso, como es posible que no nos deje, vamos a forzarlo:
  npm cache clean -- force
- Por último, instalamos las nuevas dependecias.
  npm install

## CONTACTO
Para cualquier pregunta o comentario, contactar con alexmigo@ucm.es
 
