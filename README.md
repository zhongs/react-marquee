# React Seamless Scroll

English | [简体中文](./README.zh-CN.md)

A modern React seamless scrolling component with perfect support for both horizontal and vertical scrolling. Built with TypeScript, featuring smooth scrolling effects, flexible configuration options, and complete type support.

## ✨ Features

- 🔄 Perfect seamless scrolling without gaps
- ↔️ Horizontal and vertical scrolling
- 🎯 Customizable scroll speed
- 🔁 Support for forward and reverse scrolling
- ⏯️ Hover pause support
- 🖱️ Click event handling
- 🎨 Flexible style customization
- 📱 Responsive design
- 🚀 Written in TypeScript for type safety
- 🔥 Built with React 18+
- 📦 Zero dependencies (except React)
- ⚡️ Transform-based implementation for superior performance

## 📦 Installation

```bash
npm install react-marquee-order
# or
pnpm add react-marquee-order
# or
yarn add react-marquee-order
```

## 🚀 Usage

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

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| loopData | `Array<any>` | `[]` | Data array for continuous scrolling |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Scroll direction: horizontal/vertical |
| speed | `number` | `2` | Scroll speed (pixels per frame) |
| reverse | `boolean` | `false` | Whether to scroll in reverse |
| hoverPause | `boolean` | `true` | Whether to pause on hover |
| onClick | `(item: any, index: number) => void` | - | Callback function for item clicks |

### Methods

The component exposes these methods via ref:

- `play()`: Start scrolling
- `pause()`: Pause scrolling
- `reset()`: Reset position

## 🚨 v2.0.0 Updates

- 🆙 Upgraded to React 18
- 📝 Migrated to TypeScript with full type support
- 🛠️ Upgraded build tool to Vite
- ⚡️ Optimized scrolling algorithm for smoother experience
- 🎯 Improved API design with better type support

## 🌐 Browser Support

Supports all modern browsers and IE11+ with appropriate polyfills.

## 🤝 Contributing

Pull requests are welcome to improve this component!

## 📄 License

MIT 
