import React, { useRef } from 'react'
import { Marquee, MarqueeHandle } from '../../src'
import './App.css'

const App: React.FC = () => {
  const landscapeMarqueeRef = useRef<MarqueeHandle>(null)
  const verticalMarqueeRef = useRef<MarqueeHandle>(null)
  const reverseMarqueeRef = useRef<MarqueeHandle>(null)
  const manualMarqueeRef = useRef<MarqueeHandle>(null)
  const clickMarqueeRef = useRef<MarqueeHandle>(null)

  const loopData = [
    { txt: "这是一条数据1" }, 
    { txt: "这是一条数据2" }, 
    { txt: "这是一条数据3" }, 
    { txt: "这是一条数据4" },
    { txt: "这是一条数据5" }
  ]

  const reverseData = [
    { txt: '反向滚动示例1 ←' },
    { txt: '反向滚动示例2 ←' },
    { txt: '反向滚动示例3 ←' },
    { txt: '反向滚动示例4 ←' },
    { txt: '反向滚动示例5 ←' },
  ]

  const handleMarqueeClick = (item: any, index: number) => {
    console.log('Clicked item:', item, 'at index:', index)
  }

  const renderCode = (code: string) => (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  )

  return (
    <div className="demo-container">
      <h1>React Marquee 演示</h1>
      
      <section className="demo-section">
        <h2 className="type-title">1. 默认横向滚动</h2>
        <div className="demo-box">
          <div className="preview">
            <div className="box-landscape">
              <Marquee 
                ref={landscapeMarqueeRef}
                loopData={loopData} 
                speed={2}
              />
            </div>
            <div className="controls">
              <button className="button" onClick={() => landscapeMarqueeRef.current?.play()}>开始</button>
              <button className="button" onClick={() => landscapeMarqueeRef.current?.pause()}>暂停</button>
            </div>
          </div>
          <div className="code">
            {renderCode(
`<Marquee 
  loopData={[
    { txt: "这是一条数据1" }, 
    { txt: "这是一条数据2" }
  ]} 
  speed={2}
/>`
            )}
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="type-title">2. 竖向滚动</h2>
        <div className="demo-box">
          <div className="preview">
            <div className="box-vertical">
              <Marquee 
                ref={verticalMarqueeRef}
                loopData={loopData} 
                direction='vertical' 
                verticalItemHeight='50px'
                speed={2}
              />
            </div>
            <div className="controls">
              <button className="button" onClick={() => verticalMarqueeRef.current?.play()}>开始</button>
              <button className="button" onClick={() => verticalMarqueeRef.current?.pause()}>暂停</button>
            </div>
          </div>
          <div className="code">
            {renderCode(
`<Marquee 
  loopData={loopData}
  direction='vertical'
  verticalItemHeight='50px'
  speed={2}
/>`
            )}
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="type-title">3. 反向滚动</h2>
        <div className="demo-box">
          <div className="preview">
            <div className="box-landscape">
              <Marquee 
                ref={reverseMarqueeRef}
                loopData={reverseData} 
                reverse={true}
                speed={2}
              />
            </div>
            <div className="controls">
              <button className="button" onClick={() => reverseMarqueeRef.current?.play()}>开始</button>
              <button className="button" onClick={() => reverseMarqueeRef.current?.pause()}>暂停</button>
            </div>
          </div>
          <div className="code">
            {renderCode(
`<Marquee 
  loopData={reverseData}
  reverse={true}
  speed={2}
/>`
            )}
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="type-title">4. 手动控制</h2>
        <div className="demo-box">
          <div className="preview">
            <div className="box-landscape">
              <Marquee 
                ref={manualMarqueeRef}
                loopData={loopData} 
                speed={2}
              />
            </div>
            <div className="controls">
              <button className="button" onClick={() => manualMarqueeRef.current?.play()}>开始</button>
              <button className="button" onClick={() => manualMarqueeRef.current?.pause()}>暂停</button>
            </div>
          </div>
          <div className="code">
            {renderCode(
`<Marquee 
  loopData={loopData}
  speed={2}
/>`
            )}
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="type-title">5. 点击事件</h2>
        <div className="demo-box">
          <div className="preview">
            <div className="box-landscape">
              <Marquee 
                ref={clickMarqueeRef}
                loopData={loopData} 
                speed={2}
                onClick={handleMarqueeClick}
              />
            </div>
            <div className="controls">
              <button className="button" onClick={() => clickMarqueeRef.current?.play()}>开始</button>
              <button className="button" onClick={() => clickMarqueeRef.current?.pause()}>暂停</button>
            </div>
          </div>
          <div className="code">
            {renderCode(
`<Marquee 
  loopData={loopData}
  speed={2}
  onClick={(item, index) => console.log('Clicked:', item, index)}
/>`
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
