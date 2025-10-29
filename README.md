# 🖥️ Ejecutor Visual de Bytecode

Un simulador interactivo de bytecode hexadecimal construido con React que permite visualizar la ejecución paso a paso de instrucciones de bajo nivel de manera educativa y visual.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Descripción

Este proyecto es una herramienta educativa que simula un procesador simple que ejecuta instrucciones hexadecimales. Permite a los usuarios escribir programas usando códigos hexadecimales y ver en tiempo real cómo se ejecutan, mostrando el estado del buffer, puntero, y salida.

## ✨ Características

- 🎯 **Ejecución paso a paso** de instrucciones hexadecimales
- 📊 **Visualización en tiempo real** del estado del programa
- 🎨 **Interfaz intuitiva** con resaltado de la instrucción actual
- ⚡ **Control de velocidad** ajustable de ejecución
- 📝 **Historial detallado** de cada operación ejecutada
- 🚨 **Alertas de error** cuando se exceden los límites
- 📚 **Ejemplos predefinidos** para aprender rápidamente
- 🎓 **Tabla de referencia** con todas las instrucciones disponibles

## 🎮 Instrucciones Soportadas

| Código | Nombre | Descripción |
|--------|--------|-------------|
| `0x00` | NOP | No hace nada (espera) |
| `0x01` | TAKE | Toma la letra actual y la añade al buffer |
| `0x02` | NEXT | Mueve el puntero a la siguiente posición |
| `0x03` | PRINT | Imprime el contenido del buffer en la pizarra |
| `0x04` | SEND | Envía el buffer al receptor |
| `0x05` | CLR | Limpia el contenido del buffer |
| `0xFF` | HALT | Termina la ejecución del programa |

## 🚀 Instalación

### Prerrequisitos

- Node.js 14+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/bytecode-executor.git
cd bytecode-executor
```

2. **Instalar dependencias**
```bash
npm install
```


3. **Ejecutar el proyecto**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 📁 Estructura del Proyecto

```
bytecode-executor/
├── src/
│   ├── App.jsx                 # Componente principal
│   ├── BytecodeExecutor.jsx    # Componente del ejecutor
│   ├── index.css               # Estilos globales
│   └── main.jsx                # Punto de entrada
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Cómo Usar

1. **Configurar el mensaje**: Ingresa la palabra que deseas procesar (por defecto "MENSAJE")

2. **Escribir el código**: Ingresa los códigos hexadecimales separados por espacios

3. **Ajustar la velocidad**: Usa el control deslizante para cambiar la velocidad de ejecución (100ms - 2000ms)

4. **Ejecutar**: Presiona el botón "Ejecutar" para comenzar

5. **Observar**: Mira cómo se ejecuta cada instrucción paso a paso:
   - El **puntero** se resalta en amarillo sobre la palabra
   - El **buffer** muestra el contenido acumulado
   - La **pizarra** muestra las salidas impresas
   - El **historial** registra cada operación

6. **Reset**: Presiona "Reset" para limpiar y comenzar de nuevo

## 🎨 Personalización

### Cambiar la palabra inicial
```javascript
const [mensaje, setMensaje] = useState('TU_PALABRA');
```

### Cambiar la velocidad por defecto
```javascript
const [speed, setSpeed] = useState(500); // 500ms por instrucción
```

### Agregar nuevos ejemplos
```javascript
case 4:
  setInputCode('0x01 0x02 0x01 0x03 0xFF');
  break;
```

## 🛠️ Tecnologías Utilizadas

- **React 18+** - Framework de UI
- **Vite** - Build tool y dev server
- **Lucide React** - Iconos
- **CSS3** - Estilos personalizados (sin frameworks)

## 🐛 Manejo de Errores

El ejecutor incluye validaciones para:

- ✅ **Puntero fuera de rango**: Alerta cuando se intenta acceder a una posición inexistente
- ✅ **Movimiento inválido**: Alerta cuando se intenta mover el puntero más allá del final
- ✅ **Códigos desconocidos**: Muestra mensaje en el historial para códigos no reconocidos

## 📖 Conceptos Educativos

Este proyecto es ideal para aprender sobre:

- 🔹 **Bytecode y códigos de operación (opcodes)**
- 🔹 **Punteros y gestión de memoria**
- 🔹 **Buffers y manipulación de datos**
- 🔹 **Ejecución secuencial de instrucciones**
- 🔹 **Estados y máquinas de estado**
- 🔹 **Programación de bajo nivel**

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Ulises Meixueiro** - *Trabajo Inicial* - [@umeixueiro](https://github.com/umeixueiro)

## 🙏 Agradecimientos

- Inspirado en conceptos de arquitectura de computadores y lenguajes de bajo nivel
- Iconos por [Lucide](https://lucide.dev/)
- Comunidad de React por su excelente framework

## 📞 Contacto

- GitHub: [@umeixueiro](https://github.com/umeixueiro)
- Email: umeixueiro@gmail.com

---

⭐️ Si este proyecto te fue útil, considera darle una estrella en GitHub!