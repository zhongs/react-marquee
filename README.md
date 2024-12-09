# React Marquee

一个灵活的 React 无缝滚动组件，支持横向和竖向滚动。

## 在线演示

[查看在线 Demo](https://zhongs.github.io/react-marquee/index.html)

## 特性

- 支持横向和竖向滚动
- 支持自定义滚动速度
- 支持反向滚动
- 支持鼠标悬停暂停
- 支持手动控制滚动
- 支持点击事件
- 支持自定义样式

## 安装

```bash
npm install @react-marquee/core
```

## Examples

查看完整示例：[examples/marquee/index.js](./examples/marquee/index.js)

示例包括：
- 基础横向滚动
- 竖向滚动
- 自定义速度
- 反向滚动
- 鼠标悬停暂停
- 手动控制滚动
- 点击事件处理

## 使用示例

```jsx
import Marquee from '@react-marquee/core';

// 基础用法
const BasicExample = () => (
  <Marquee 
    loopData={[
      { txt: '滚动内容1' },
      { txt: '滚动内容2' }
    ]} 
  />
);

// 竖向滚动
const VerticalExample = () => (
  <Marquee 
    loopData={[
      { txt: '竖向滚动1' },
      { txt: '竖向滚动2' }
    ]} 
    direction="vertical"
    verticalItemHeight="60px"
  />
);

// 反向滚动
const ReverseExample = () => (
  <Marquee 
    loopData={[
      { txt: '反向滚动1' },
      { txt: '反向滚动2' }
    ]} 
    reverse={true}
  />
);

// 鼠标悬停暂停
const HoverPauseExample = () => (
  <Marquee 
    loopData={[
      { txt: '鼠标悬停暂停1' },
      { txt: '鼠标悬停暂停2' }
    ]} 
    hoverPause={true}
  />
);

// 手动控制滚动
const ManualControlExample = () => {
  const marqueeRef = React.useRef();

  const handleStart = () => {
    marqueeRef.current?.start();
  };

  const handleStop = () => {
    marqueeRef.current?.stop();
  };

  return (
    <>
      <Marquee 
        ref={marqueeRef}
        loopData={[
          { txt: '手动控制1' },
          { txt: '手动控制2' }
        ]} 
        autoPlay={false}
      />
      <button onClick={handleStart}>开始</button>
      <button onClick={handleStop}>暂停</button>
    </>
  );
};

// 点击事件处理
const ClickExample = () => (
  <Marquee 
    loopData={[
      { txt: '点击事件1' },
      { txt: '点击事件2' }
    ]} 
    onClick={(item, index) => {
      console.log(`点击了第${index + 1}项: ${item.txt}`);
    }}
  />
);
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loopData | 滚动数据 | array | - |
| direction | 滚动方向，可选值：'landscape'、'vertical' | string | 'landscape' |
| verticalItemHeight | 竖向滚动时每项的高度 | string | '60px' |
| speed | 滚动速度 | number | 2 |
| reverse | 是否反向滚动 | boolean | false |
| hoverPause | 是否启用鼠标悬停暂停 | boolean | false |
| autoPlay | 是否自动开始滚动 | boolean | true |
| onClick | 点击项目时的回调，参数为 (item, index) | function | - |

### 实例方法

通过 ref 可以获取到组件实例并调用以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始滚动 | - |
| stop | 暂停滚动 | - |

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务
npm run examples

# 构建
npm run build
```

## License

MIT
