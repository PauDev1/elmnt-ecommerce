# ELMNT |  E-commerce 
[![Ver Sitio en Vivo](https://img.shields.io/badge/ELMNT-Visitar_Sitio-black?style=for-the-badge&logo=vercel)](https://elmnt-skincare.vercel.app/)

**ELMNT** es una plataforma de e-commerce  para productos de skincare premium. El proyecto se enfoca en una estética minimalista, alto rendimiento (Web Vitals) y una gestión de estado eficiente para una experiencia de usuario fluida.

---

##  Tech Stack

### Frontend
* **React 19 (Hooks & Suspense):** Implementación de `lazy loading` para rutas y componentes, optimizando el bundle inicial.
* **Tailwind CSS 4:** Estilizado modular y responsivo con una paleta de colores personalizada y efectos de desenfoque (`backdrop-blur`).
* **React Router Dom 7:** Gestión de navegación SPA con persistencia de scroll.
* **Context API:** Sistema centralizado para la gestión del carrito de compras y estados globales.
* **Sonner:** Sistema de notificaciones *toast* para feedback de acciones (CRUD y Carrito).

### Tooling & Performance
* **Vite 8:** Herramienta de construcción de última generación para un desarrollo ultrarrápido.
* **WebP Image Optimization:** Imágenes de productos optimizadas para garantizar tiempos de carga menores a 500ms.
* **Responsive Design:** Arquitectura adaptativa orientada a Mobile-First.

---

##  Key Features

* **Carrito de Compras Persistente:** Gestión dinámica con barra de progreso para envío gratis y actualización de stock en tiempo real.
* **Panel de Administración (CRUD):** Interfaz protegida para la gestión de productos (Crear, Editar, Eliminar) integrada con API externa.
* **Checkout Multinivel:** Formulario de pago validado con simulador de tarjeta de crédito dinámico y manejo de LocalStorage para recuperación de datos.
* **Búsqueda Inteligente:** Filtro de catálogo en tiempo real por nombre y categoría.
* **Arquitectura Modular:** Separación clara entre secciones (`sections`), componentes de UI (`components`), lógica de negocio (`hooks`) y datos estáticos.

---

##  Estructura del Proyecto

```plaintext
src/
├── components/   # UI Reutilizable (Navbar, Modales, CartDrawer)
├── context/      # Gestión de estado global (CartContext)
├── hooks/        # Lógica de negocio (useCart)
├── pages/        # Vistas principales (Home, Admin, Checkout)
├── sections/     # Bloques grandes de contenido (Hero, Features)
└── data/         # Mock data y configuraciones
````



## Instalación y Uso

1.  **Clonar el repositorio:**
    
    Bash
    
    ```
    git clone https://github.com/PauDev1/elmnt-ecommerce.git
    
    ```
    
2.  **Instalar dependencias:**
    
    Bash
    
    ```
    npm install
    
    ```
    
3.  **Correr en desarrollo:**
    
    Bash
    
    ```
    npm run dev
    
    ```
    

----------



##  Contacto

Si tenés alguna duda sobre el proyecto o simplemente querés charlar sobre desarrollo, ¡no dudes en escribirme!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/paola-lizarriba/)   [![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=astro&logoColor=white)](https://pao-portfolio.vercel.app/)

**Paola** - Full Stack Developer 
