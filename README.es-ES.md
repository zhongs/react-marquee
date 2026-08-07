

# React Scroll Sin Interrupciones

Inglés | [简体中文](./README.zh-CN.md)

Un componente moderno de desplazamiento sin interrupciones en React con soporte perfecto tanto para el desplazamiento horizontal como vertical. Construido con TypeScript, ofrece efectos de desplazamiento suaves, opciones de configuración flexibles y soporte completo de tipos.

## 🌐 Demo

Consulta la demostración en vivo: [React Seamless Scroll Demo](https://zhongs.github.io/react-marquee/)

## ✨ Características

- 🔄 Desplazamiento sin interrupciones perfecto, sin saltos
- ↔️ Desplazamiento horizontal y vertical
- 🎯 Velocidad de desplazamiento personalizable
- 🔁 Soporte para desplazamiento hacia adelante y hacia atrás
- ⏯️ Soporte para pausar al pasar el cursor (hover)
- 🖱️ Manejo de eventos de clic
- 🎨 Personalización flexible de estilos
- 📱 Diseño responsivo
- 🚀 Escrito en TypeScript para seguridad en los tipos
- 🔥 Construido con React 18+
- 📦 Cero dependencias (excepto React)
- ⚡️ Implementación basada en transformaciones para un rendimiento superior

## 📦 Instalación

```bash
npm install react-marquee-order
# or
pnpm add react-marquee-order
# or
yarn add react-marquee-order
```

## 🚀 Uso

```tsx
import React, { useRef } from 'react';
import { Marquee, MarqueeHandle } from 'react-marquee-order';

const App = () => {
  const marqueeRef = useRef<MarqueeHandle>(null);
  
  const data = [
    { text: "Seamless scroll item 1" },
    { text: "Seamless scroll item 2" },
    { text: "Seamless scroll item 3" }
  ];

  const handleClick = (item: any, index: number) => {
    console.log('Clicked:', item, 'at index:', index);
  };

  return (
    <div style={{ width: '100%', height: '40px' }}>
      <Marquee
        ref={marqueeRef}
        loopData={data}
        speed={2}
        direction="horizontal"
        reverse={false}
        hoverPause={true}
        onClick={handleClick}
      />
    </div>
  );
};

export default App;
```

## 📖 Referencia de la API

### Propiedades

| Propiedad | Tipo | Predeterminado | Descripción |
|------|------|---------|-------------|
| loopData | `Array<any>` | `[]` | Matriz de datos para desplazamiento continuo |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Dirección del desplazamiento: horizontal/vertical |
| speed | `number` | `2` | Velocidad del desplazamiento (píxeles por fotograma) |
| reverse | `boolean` | `false` | Indica si el desplazamiento debe ser inverso |
| hoverPause | `boolean` | `true` | Indica si debe pausarse al pasar el cursor |
| onClick | `(item: any, index: number) => void` | - | Función de retorno (callback) para los clics en los elementos |

### Métodos

El componente expone los siguientes métodos a través de `ref`:

- `play()`: Iniciar el desplazamiento
- `pause()`: Pausar el desplazamiento
- `reset()`: Restablecer la posición

## 🚨 Actualizaciones de la versión 2.0.0

- 🆙 Actualizado a React 18
- 📝 Migrado a TypeScript con soporte completo de tipos
- 🛠️ Actualizada la herramienta de compilación a Vite
- ⚡️ Algoritmo de desplazamiento optimizado para una experiencia más fluida
- 🎯 Diseño de API mejorado con mejor soporte de tipos

## 🌐 Compatibilidad con Navegadores

Compatible con todos los navegadores modernos e IE11+ con los polyfills adecuados.

## 🤝 Contribuir

¡Las solicitudes de extracción (pull requests) son bienvenidas para mejorar este componente!

## 📄 Licencia

MIT
