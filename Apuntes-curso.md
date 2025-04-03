# Apuntes

## Introducción a React Native
**Fecha:** 03-04-2025

---

### Conceptos Clave

#### Instalación
```bash
npx create-expo-app@latest curso-react-native-metacritic-app --template blank
```

#### Activar visualización web
### **Instalación de dependencias necesarias**

Ejecuta los siguientes comandos para instalar las dependencias requeridas:

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

- **`react-dom`**: Permite renderizar componentes React en el DOM (necesario para aplicaciones web).
- **`react-native-web`**: Hace que los componentes de React Native sean compatibles con la web.
- **`@expo/metro-runtime`**: Proporciona herramientas de compilación y ejecución para proyectos Expo.

```bash
npx expo lint
```

- **`expo lint`**: Ejecuta un análisis estático del código para detectar errores y mejorar la calidad del código.

```bash
npx expo install -- --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

- **`prettier`**: Herramienta para formatear el código automáticamente.
- **`eslint-config-prettier`**: Desactiva reglas de ESLint que podrían entrar en conflicto con Prettier.
- **`eslint-plugin-prettier`**: Integra Prettier como una regla de ESLint para mostrar errores de formato.

---

### **Configuración de ESLint (`.eslintrc.js`)**

Configura ESLint para que funcione con Prettier y Expo:

```javascript
// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: ["expo", "prettier"], // Usa las configuraciones base de Expo y Prettier
    plugins: ["prettier"], // Habilita el plugin de Prettier
    ignorePatterns: ["/dist/*"], // Ignora la carpeta de distribución
    rules: {
        "prettier/prettier": "error", // Marca errores si el código no sigue las reglas de Prettier
    },
};
```

---

### **Instalación de Safe Area Context**

```bash
npx expo install react-native-safe-area-context
```

- **`react-native-safe-area-context`**: Maneja áreas seguras en dispositivos (como la barra de estado o el notch) para evitar que el contenido quede oculto.

---

### **Instalación de SVG**

```bash
npx expo install react-native-svg
```

- **`react-native-svg`**: Permite trabajar con gráficos vectoriales (SVG) en React Native.
#### Documentación
- [React Native Docs](https://reactnative.dev/docs/text)  
    En la documentación:  
    - **🟢 Punto verde**: Compatible con Android.  
    - **⚫ Punto negro**: Compatible con iOS.

#### Elementos básicos de React Native
- **`<View>`**: Similar a un `div` en HTML. [Documentación](https://reactnative.dev/docs/view)
- **`<Text>`**: Obligatorio para renderizar texto. [Documentación](https://reactnative.dev/docs/text)
- **`<Image>`**: Para mostrar imágenes. [Documentación](https://reactnative.dev/docs/image)

**Ejemplo de uso con imágenes locales:**
```javascript
const icon = require("./assets/icon.png"); // o usar import

<Image 
        source={icon}
        fadeDuration={1} // Solo en Android: fade in de la imagen
        blurRadius={5} // Desenfoque
        style={{
                width: 100,
                resizeMode: "center", // Opciones: "center", "contain", "stretch", "repeat"
        }}
/>
```

**Ejemplo de uso con imágenes remotas:**  
⚠️ **Es obligatorio especificar la resolución (`width` y `height`).**
```javascript
<Image 
        source={{ uri: "https://iraldidev.vercel.app" }} 
        style={{ width: 100, height: 100 }}
/>
```

- **`<StatusBar style={"light"/"dark"}>`**: Cambia el color de la barra de estado (la de arriba).

**Ejemplo de botones:**
```javascript
<Button 
        color="red" 
        title="Pulsa aquí" 
        onPress={() => alert('Hola')} 
/>
```
> ⚠️ Este botón no se puede estilizar completamente, solo puedes cambiar el color y el texto.

```javascript
<TouchableHighlight
        underlayColor="#09f"
        onPress={() => alert('Hola')}
>
        <Text style={{ color: "white" }}>Pulsa aquí</Text>
</TouchableHighlight>
```
> ✅ Este botón permite estilos personalizados, imágenes internas y color de fondo.

**Otros botones disponibles:**
- **`TouchableOpacity`**: Reduce la opacidad al presionar.
- **`TouchableNativeFeedback`**: Efecto nativo en Android.
- **`Pressable`**: Para configuraciones más avanzadas.

#### Estilos
Se importa `StyleSheet` de `react-native`.

**Ejemplo:**
```javascript
const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: "#fff",
        },
});
```

#### Resoluciones efectivas
Los píxeles se ajustan según el dispositivo.  
**Ejemplo:** iPhone 15 tiene una resolución efectiva de:  
- **`x: 395`**  
- **`y: 850`**

#### ScrollView
**Para hacer un `View` desplazable (contenido estático o simple):**
```javascript
<ScrollView>
    {data.map((item) => <Card key={item.id} item={item} />)}
</ScrollView>
```
> ⚠️ Renderiza todo el contenido a la vez.

#### ActivityIndicator
**Componente para indicar cargas:**
```javascript
<View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
    {data.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator />
            <Text style={{ color: "#EEEEEE" }}>Loading...</Text>
        </View>
    ) : (
        <ScrollView>
            {data.map((item) => <Card key={item.id} item={item} />)}
        </ScrollView>
    )}
</View>
```

#### FlatList
**Para contenido dinámico (mejor que `ScrollView`):**

El componente `FlatList` en React Native es ideal para manejar listas grandes de datos de manera eficiente, ya que solo renderiza los elementos visibles en pantalla, a diferencia de `ScrollView`, que renderiza todos los elementos a la vez.

**Atributos obligatorios:**
1. **`data`**: Es la fuente de datos que se va a renderizar. Debe ser un array.
   - Ejemplo: `[ { key: '1', name: 'Item 1' }, { key: '2', name: 'Item 2' } ]`

2. **`renderItem`**: Es una función que define cómo se renderiza cada elemento de la lista. Recibe un objeto con la propiedad `item`, que representa un elemento del array `data`.
   - Ejemplo: `({ item }) => <Text>{item.name}</Text>`

3. **`keyExtractor`**: Es una función que devuelve una clave única para cada elemento. Esto es importante para que React pueda identificar cada elemento de la lista de manera eficiente.
   - Ejemplo: `(item) => item.key`

**Atributos opcionales:**
- **`showsVerticalScrollIndicator`** y **`showsHorizontalScrollIndicator`**: Controlan si se muestran las barras de desplazamiento vertical y horizontal. Por defecto, están activadas (`true`).

**Ejemplo de uso:**
```javascript
<FlatList
    data={[{ key: '1', name: 'Item 1' }, { key: '2', name: 'Item 2' }]}
    keyExtractor={(item) => item.key}
    renderItem={({ item }) => <Text>{item.name}</Text>}
    showsVerticalScrollIndicator={false} 
    showsHorizontalScrollIndicator={false}
/>
```

**Ventajas de `FlatList`:**
- Mejora el rendimiento al renderizar listas grandes.
- Soporta optimizaciones como carga diferida y reciclaje de vistas.

#### SafeAreaView
> ⚠️ **Nota:** Este componente es exclusivo para iOS y no tiene efecto en Android.

**Mejora la visualización del contenido (solo para iOS):**
```javascript
<SafeAreaView>
    <ScrollView>
        {data}
    </ScrollView>
</SafeAreaView>
```

#### SafeAreaContext

El uso de `SafeAreaContext` en React Native es fundamental para garantizar que el contenido de tu aplicación se renderice correctamente en dispositivos con áreas seguras, como las muescas (notches) o bordes redondeados.

**Pasos para configurar `SafeAreaContext`:**

1. **Instalar la dependencia:**
    Asegúrate de haber instalado `react-native-safe-area-context` en tu proyecto:
    ```bash
    npx expo install react-native-safe-area-context
    ```

2. **Crear un componente principal:**
    Crea una carpeta llamada `components` y dentro de ella un archivo llamado `Main.jsx`. Este será el componente principal donde renderizarás el contenido de tu aplicación.

3. **Configurar el archivo `App.js`:**
    En el archivo `App.js`, envuelve toda tu aplicación dentro del componente `SafeAreaProvider` para habilitar el manejo de áreas seguras.

    **Ejemplo de `App.js`:**
    ```javascript
    import { SafeAreaProvider } from "react-native-safe-area-context";
    import Main from "./components/Main";

    // Envolver TODA la app en el provider
    export default function App() {
         return (
              <SafeAreaProvider>
                    <Main />
              </SafeAreaProvider>
         );
    }
    ```

4. **Uso del hook `useSafeAreaInsets`:**
    En cualquier componente, puedes usar el hook `useSafeAreaInsets` para obtener los márgenes seguros (`top`, `bottom`, `left`, `right`) y aplicarlos al diseño.

    **Ejemplo de uso en `Main.jsx`:**
    ```javascript
    import React from "react";
    import { View, ScrollView } from "react-native";
    import { useSafeAreaInsets } from "react-native-safe-area-context";

    export default function Main() {
         const insets = useSafeAreaInsets();

         return (
              <View style={{ 
                    paddingTop: insets.top, 
                    paddingBottom: insets.bottom, 
                    flex: 1 
              }}>
                    <ScrollView>
                         {/* Renderiza aquí tu contenido */}
                    </ScrollView>
              </View>
         );
    }
    ```

**Notas importantes:**
- El componente `SafeAreaProvider` debe envolver toda la aplicación para que los márgenes seguros estén disponibles en cualquier parte del árbol de componentes.
- El hook `useSafeAreaInsets` es útil para ajustar dinámicamente el diseño según las áreas seguras del dispositivo.

Con esta configuración, tu aplicación estará preparada para manejar correctamente las áreas seguras en dispositivos modernos.

#### Uso de componentes SVG en React Native

Cuando instalamos `react-native-svg`, podemos convertir archivos SVG en componentes reutilizables de React Native. Esto es útil para trabajar con gráficos vectoriales en nuestras aplicaciones.

##### Pasos para usar SVG como componentes:

1. **Instalar la dependencia:**
    Asegúrate de haber instalado `react-native-svg` en tu proyecto:
    ```bash
    npx expo install react-native-svg
    ```

2. **Convertir el archivo SVG a un componente React Native:**
    Utiliza herramientas en línea como [SVGOMG](https://jakearchibald.github.io/svgomg/) o [SVGR](https://react-svgr.com/playground/) para transformar el código SVG en un componente React Native.

3. **Crear el componente SVG:**
    Copia el código generado y pégalo en un archivo de tu proyecto. Por ejemplo, crea un archivo `Logo.jsx` en tu carpeta de componentes.

##### Ejemplo de componente SVG:

```javascript
import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Logo = (props) => (
  <Svg
     xmlns="http://www.w3.org/2000/svg"
     xmlSpace="preserve"
     width={800}
     height={800}
     viewBox="0 0 512 512"
     {...props}
  >
     <Path d="M76.8 230.4v230.4H256V230.4H76.8zm153.6 204.8h-128V256h128v179.2z" />
     <Path d="M512 153.6v-51.209c0-2.756-.444-5.487-1.314-8.098l-25.6-76.791A25.598 25.598 0 0 0 460.8 0H51.2a25.598 25.598 0 0 0-24.286 17.502l-25.6 76.791A25.606 25.606 0 0 0 0 102.391V153.6c0 14.14 11.46 25.6 25.6 25.6v307.2H12.8c-7.074 0-12.8 5.726-12.8 12.8 0 7.074 5.726 12.8 12.8 12.8h486.4c7.074 0 12.8-5.726 12.8-12.8 0-7.074-5.726-12.8-12.8-12.8h-12.8V179.2c14.14 0 25.6-11.46 25.6-25.6zm-51.2-128 21.333 64h-95.479l-16.282-64H460.8zm-192 0h75.128l16 64H268.8v-64zm0 89.6h94.72v38.4H268.8v-38.4zM168.073 25.6H243.2v64h-91.128l16.001-64zm-19.593 89.6h94.72v38.4h-94.72v-38.4zM51.2 25.6h90.428l-16.282 64H29.867l21.333-64zm-25.6 89.6h97.28v38.4H25.6v-38.4zm384 371.2H307.2V384h25.6v-25.6h-25.6V256h102.4v230.4zm51.2 0h-25.6v-256H281.6v256H51.2V179.2h409.6v307.2zm0-332.8h-71.68v-38.4h97.28v38.4h-25.6z" />
  </Svg>
);
```

4. **Usar el componente SVG en tu aplicación:**
    Importa y utiliza el componente en cualquier parte de tu aplicación:
    ```javascript
    import { Logo } from "./components/Logo";

    export default function App() {
      return (
         <View>
            <Logo width={100} height={100} />
         </View>
      );
    }
    ```

##### Ventajas:
- Los componentes SVG son escalables y no pierden calidad al redimensionarse.
- Puedes personalizar fácilmente las propiedades como `width`, `height` y colores.

Con este enfoque, puedes integrar gráficos vectoriales en tu aplicación React Native de manera eficiente y profesional.


---

### Notas Detalladas
<!-- Escribe aquí las notas principales -->

---

### Ejemplos
```javascript
// Código de ejemplo o explicación
```

---

### Dudas o Preguntas
- <!-- Pregunta 1 -->
- <!-- Pregunta 2 -->

---

### Recursos Adicionales
- [Enlace 1](#)
- [Enlace 2](#)
- [Enlace 3](#)