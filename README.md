## 🚀 Instrucciones de Instalación y Ejecución
Seguí estos pasos para clonar, instalar las dependencias y ejecutar el proyecto en tu entorno local de desarrollo:

**1. Instalar dependencias del proyecto:**
   ```
   npm i
   ```

**2. Iniciar el servidor de desarrollo de Expo:**
    ```
    npm start
    ```

💡 Nota: Una vez iniciado el servidor, podés presionar a para abrir el emulador de Android, i para el simulador de iOS, w para la versión Web, o escanear el código QR con la aplicación Expo Go en tu dispositivo móvil.

## 📁 Jerarquía de Archivos y Árbol de Directorios
La estructura de la carpeta src/ (o la carpeta raíz de tu aplicación) se organiza bajo el patrón de arquitectura de componentes modulares en React Native para garantizar escalabilidad y orden:

    src/
    ├── assets/                    # Recursos estáticos (imágenes locales, logos)
    ├── components/                # Componentes de UI reutilizables y atómicos
    │   ├── icons/                 # Íconos vectoriales SVG personalizados (Home, Reels, etc.)
    │   ├── Loader.tsx             # Indicador visual de carga de datos
    │   ├── PostCard.tsx           # Tarjeta contenedora de publicaciones individuales
    │   └── StoryCircle.tsx        # Avatar circular de las historias (stories)
    ├── navigation/                # Configuración y enrutamiento de pantallas
    │   ├── BottomTabNavigator.tsx # Navegador inferior estilo "píldora flotante" (5 pestañas)
    │   └── StackNavigator.tsx     # Navegador de pila principal (Tabs, Detalle, Perfil)
    ├── screens/                   # Vistas o pantallas principales de la aplicación
    │   ├── DetailScreen.tsx       # Pantalla de detalle de publicación con comentarios
    │   ├── HomeScreen.tsx         # Feed de inicio con historias y publicaciones de gatos
    │   ├── MessagesScreen.tsx     # Pantalla central de mensajería (Simulada)
    │   ├── ProfileScreen.tsx      # Perfil de usuario con grilla de fotos y estadísticas
    │   ├── ReelsScreen.tsx        # Sección de vídeos cortos (Simulada)
    │   └── SearchScreen.tsx       # Buscador de la aplicación (Simulada)
    ├── services/                  # Consumo de APIs externas e integraciones
    │   └── apiCalls.ts            # Configuración y llamadas a "The Cat API"
    └── types.ts                   # Definiciones de tipos estáticos globales de TypeScript

## 🛠️ Desglose Técnico y Justificación de Componentes
**1. PostCard.tsx**

_Justificación Conceptual:_ Representa la unidad atómica de información visual en el feed. Aislarlo en su propio archivo permite que el renderizado de la lista de posts en HomeScreen sea sumamente limpio y eficiente, evitando re-renders innecesarios en la pantalla principal.

_Flujo de Props:_
- post: Objeto de tipo CatPost con los datos específicos (URL, nombre de usuario, descripción, comentarios, likes).
- onPressImage: Función de callback que se ejecuta al presionar la imagen para gatillar la navegación hacia DetailScreen.

**2. StoryCircle.tsx**

_Justificación Conceptual:_ Componente circular que contiene la foto de perfil y el nombre de usuario de las historias activas. Centraliza el diseño del borde de gradiente clásico de las stories.

_Flujo de Props:_
- item: Datos de tipo Story que contienen el identificador, la URL del avatar y el nombre del usuario.

**3. Loader.tsx**

_Justificación Conceptual:_ Un spinner de carga reutilizable para estandarizar el "Feedback visual de espera" en las llamadas asíncronas de la API, tanto en la pantalla de inicio como en la pantalla de perfil.

**4. Icons (HomeIcon, ProfileIcon, etc.)**
_Justificación Conceptual:_ Componentes SVG puros que eliminan la dependencia de paquetes pesados de íconos. Al recibir props: React.SVGProps<SVGSVGElement>, heredan dinámicamente propiedades del contenedor padre, facilitando variaciones de tamaño o color para estados activos/inactivos.

## 🔄 Declaración de Gestión de Estados y Hooks
La aplicación hace un uso estratégico de estados locales utilizando el hook nativo de React, garantizando que cada pantalla y componente sea autónomo y mantenga un alto rendimiento:

**HomeScreen.tsx**
- posts (useState<CatPost[]>): Almacena el listado de publicaciones de gatos recuperado de la API.
- stories (useState<Story[]>): Almacena el listado de avatares destinados al carrusel horizontal superior.
- loading (useState<boolean>): Estado booleano que determina si se renderiza el Loader o si la llamada asíncrona ya finalizó para desplegar la interfaz.
- useEffect: Dispara de forma automática la llamada asíncrona a la API externa apenas se monta el componente.

**ProfileScreen.tsx**
- posts (useState<CatPost[]>): Almacena el set de publicaciones que corresponden a la grilla de imágenes del perfil propio de la cuenta de usuario.
- loading (useState<boolean>): Controla el estado de carga y renderizado del spinner en la vista del perfil de forma independiente a la Home.

**DetailScreen.tsx**
- liked (useState<boolean>): Almacena el estado binario (Megusta / No Megusta) del post actualizador. Es local para que la interacción de dar doble tap o presionar el corazón no afecte globalmente al resto de la aplicación de manera descontrolada.
- likesCount (useState<number>): Almacena de forma dinámica el número total de likes, sumando o restando de forma reactiva al presionar el ícono de corazón..
