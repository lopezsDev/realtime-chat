# 🚀 Real-Time Chat con WebSocket y Spring Boot

![Banner del Proyecto](https://via.placeholder.com/1200x300/0078D7/FFFFFF?text=Real-Time+Chat+Application)


## 📝 Descripción

Este proyecto implementa una aplicación de chat en tiempo real utilizando WebSockets para la comunicación bidireccional entre clientes y servidor. Es una demostración de comunicación en tiempo real utilizando Spring Boot en el backend y JavaScript puro en el frontend.

La aplicación permite:
- Conectarse con un nombre de usuario
- Enviar mensajes a usuarios específicos
- Ver mensajes entrantes y salientes en tiempo real

## 🔧 Tecnologías Utilizadas

### Backend
- **Java 17+**
- **Spring Boot 3.4.3**
- **Spring WebSocket**
- **STOMP (Simple Text Oriented Messaging Protocol)**
- **SockJS**
- **Maven**

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **SockJS Client**
- **STOMP.js**

## 🏗 Arquitectura

La aplicación sigue una arquitectura monolítica tradicional de Spring Boot con las siguientes capas:

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Cliente   │◄─────►│  WebSocket  │◄─────►│  Servicio   │
│  (Browser)  │       │  (STOMP)    │       │   de Chat   │
└─────────────┘       └─────────────┘       └─────────────┘
                                                   │
                                                   ▼
                                            ┌─────────────┐
                                            │ Repositorio │
                                            │(Persistencia)│
                                            └─────────────┘
```

El proyecto está organizado en las siguientes capas:

- **config**: Configuración de WebSocket y otros componentes de Spring
- **controller**: Controladores que manejan las peticiones WebSocket
- **dto**: Objetos de transferencia de datos para los mensajes
- **entity**: Entidades para persistencia de datos
- **repository**: Acceso a datos y persistencia
- **service**: Lógica de negocio y procesamiento de mensajes
- **exception**: Manejo centralizado de excepciones

La aplicación utiliza una arquitectura simple pero efectiva que sigue los principios de separación de responsabilidades, permitiendo mantener el código organizado y fácil de mantener.

## ✨ Características

- **Comunicación en Tiempo Real**: Mensajes entregados instantáneamente sin refrescar la página
- **Chat Privado**: Mensajes dirigidos a usuarios específicos
- **Interfaz Sencilla e Intuitiva**: Fácil de usar y entender
- **Arquitectura Escalable**: Diseñada para manejar múltiples conexiones simultáneas
- **Notificaciones de Sistema**: Indica conexiones y desconexiones
- **Historial de Mensajes**: Muestra todos los mensajes enviados y recibidos durante la sesión

## 💻 Instalación y Configuración

### Prerrequisitos

- JDK 11 o superior
- Maven 3.6 o superior
- Navegador web moderno

### Pasos de Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/real-time-chat.git
   cd real-time-chat
   ```

2. Construir el proyecto usando Maven:
   ```bash
   mvn clean install
   ```

3. Iniciar la aplicación:
   ```bash
   mvn spring-boot:run
   ```

4. Acceder a la aplicación en tu navegador:
   ```
   http://localhost:8080
   ```

## 🖱 Uso

1. **Ingresar nombre de usuario**: Introduce un nombre de usuario único y haz clic en "Conectar"
2. **Iniciar conversación**: Introduce el nombre del destinatario y escribe tu mensaje
3. **Enviar mensaje**: Presiona Enter o haz clic en el botón "Enviar"
4. **Recibir mensajes**: Los mensajes entrantes aparecerán automáticamente en la ventana de chat


## 📸 Capturas de Pantalla

### Interfaz de Chat
![Interfaz de Chat](https://via.placeholder.com/800x500/207245/FFFFFF?text=Chat+Interface)

### Conexión WebSocket
![Configuración WebSocket](https://via.placeholder.com/800x300/4B0082/FFFFFF?text=WebSocket+Configuration)

### Estructura del Proyecto
![Estructura del Proyecto](https://via.placeholder.com/400x600/800000/FFFFFF?text=Project+Structure)

## 🚀 Posibles Mejoras

- Implementación de autenticación y autorización con Spring Security
- Almacenamiento persistente de mensajes en base de datos
- Funcionalidad de chat grupal
- Notificaciones de estado (escribiendo, en línea, etc.)
- Envío de imágenes y archivos
- Interfaz de usuario mejorada con frameworks como React o Angular

## 👥 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/chat-feature`)
3. Realiza tus cambios y haz commit (`git commit -m 'Add some chat feature'`)
4. Push a la rama (`git push origin feature/chat-feature`)
5. Abre un Pull Request

## 📫 Contacto

¿Tienes preguntas o comentarios sobre este proyecto? ¡Me encantaría saberlo!

[📧 Contáctame por Email](mailto:lopezs.dev@gmail.com)

---

⭐️ Este proyecto es parte de mi portafolio como desarrollador backend. Si te ha gustado, ¡dale una estrella! ⭐️
