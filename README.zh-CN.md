# React 无缝滚动组件

一个现代化的 React 无缝滚动组件，完美支持横向和纵向滚动。基于 TypeScript 开发，具有丝滑流畅的滚动效果、灵活的配置选项和完整的类型支持。

## ✨ 特性

- 🔄 完美无缝滚动，无断层感
- ↔️ 支持横向和纵向滚动
- 🎯 自定义滚动速度
- 🔁 支持正反向滚动
- ⏯️ 支持鼠标悬停暂停
- 🖱️ 支持点击事件处理
- 🎨 灵活的样式定制
- 📱 响应式设计
- 🚀 TypeScript 编写，类型安全
- 🔥 基于 React 18+ 构建
- 📦 零依赖（仅依赖 React）
- ⚡️ 基于 transform 实现，性能出众

## 📦 安装

```bash
npm install react-marquee-order
# 或者
pnpm add react-marquee-order
# 或者
yarn add react-marquee-order
```

## 🚀 使用示例

```tsx
import React, { useRef } from 'react';
import { Marquee, MarqueeHandle } from 'react-marquee-order';

const App = () => {
  const marqueeRef = useRef<MarqueeHandle>(null);
  
  const data = [
    { text: "无缝滚动第一项" },
    { text: "无缝滚动第二项" },
    { text: "无缝滚动第三项" }
  ];

  const handleClick = (item: any, index: number) => {
    console.log('点击了:', item, '索引:', index);
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

## 📖 API 文档

### Props 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| loopData | `Array<any>` | `[]` | 要循环显示的数据数组 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 滚动方向：水平/垂直 |
| speed | `number` | `2` | 滚动速度（每帧像素） |
| reverse | `boolean` | `false` | 是否反向滚动 |
| hoverPause | `boolean` | `true` | 鼠标悬停时是否暂停 |
| onClick | `(item: any, index: number) => void` | - | 点击项目的回调函数 |

### 组件方法

通过 ref 可以调用以下方法：

- `play()`: 开始滚动
- `pause()`: 暂停滚动
- `reset()`: 重置位置

## 🚨 v2.0.0 版本更新

- 🆙 升级到 React 18
- 📝 迁移到 TypeScript，提供完整类型支持
- 🛠️ 构建工具升级到 Vite
- ⚡️ 优化滚动算法，提供更流畅的体验
- 🎯 改进 API 设计，提供更好的类型支持

## 🌐 浏览器支持

支持所有现代浏览器，搭配合适的 polyfills 可支持 IE11+。

## 🤝 参与贡献

欢迎提交 Pull Request 来改进这个组件！

## 📄 许可证

MIT © [Your Name]

---

[English](./README.md) | 简体中文
