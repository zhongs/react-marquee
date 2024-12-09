import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { MarqueeProps, MarqueeItem } from './types';
import './marquee.css';

export interface MarqueeHandle {
  play: () => void;
  pause: () => void;
  reset: () => void;
}

// 计算建议的滚动速度
const calculateSpeed = (content: MarqueeItem[], direction: 'horizontal' | 'vertical'): number => {
  // 计算内容总长度
  const totalLength = content.reduce((acc, item) => acc + (item.txt?.length || 0), 0);
  
  // 基础速度参数
  const baseSpeed = 2;
  
  // 根据内容长度调整速度
  // 水平方向：内容越长，速度适当增加
  // 垂直方向：保持相对稳定的速度
  if (direction === 'horizontal') {
    // 每20个字符增加1的速度，但设置上限为8
    const adjustedSpeed = baseSpeed + Math.min(Math.floor(totalLength / 20), 6);
    return adjustedSpeed;
  } else {
    // 垂直方向速度相对稳定，仅做小幅调整
    return baseSpeed + Math.min(Math.floor(totalLength / 50), 2);
  }
};

export const Marquee = forwardRef<MarqueeHandle, MarqueeProps>(({
  loopData,
  direction = 'horizontal',
  speed,
  verticalItemHeight = '60px',
  reverse = false,
  hoverPause = false,
  autoPlay = true,
  onClick,
  className = '',
  style = {},
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isRunning, setIsRunning] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const [offset, setOffset] = useState(0);

  // 如果没有提供速度，则自动计算
  const effectiveSpeed = speed ?? calculateSpeed(loopData, direction);

  useImperativeHandle(ref, () => ({
    play: () => {
      setIsRunning(true);
      setIsPaused(false);
    },
    pause: () => {
      setIsPaused(true);
    },
    reset: () => {
      setOffset(0);
      if (contentRef.current) {
        contentRef.current.style.transform = 'translate(0, 0)';
      }
      setIsRunning(true);
      setIsPaused(false);
    }
  }));

  const resetPosition = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;
    
    const content = contentRef.current;
    const isHorizontal = direction === 'horizontal';
    
    // 获取单个内容的尺寸
    const itemSize = isHorizontal ? 
      content.scrollWidth / 3 : // 因为我们复制了两份内容，所以总宽度除以3
      content.scrollHeight / 3;

    // 设置初始位置
    setOffset(itemSize);
  }, [direction]);

  const animate = useCallback(() => {
    if (!containerRef.current || !contentRef.current || !isRunning || isPaused) return;

    const content = contentRef.current;
    const isHorizontal = direction === 'horizontal';
    
    // 获取单个内容的尺寸
    const itemSize = isHorizontal ? 
      content.scrollWidth / 3 : 
      content.scrollHeight / 3;

    let newOffset = offset + (reverse ? -effectiveSpeed : effectiveSpeed);

    // 当偏移量超出范围时重置位置
    if (!reverse) {
      if (newOffset >= itemSize * 2) {
        newOffset = itemSize;
      }
    } else {
      if (newOffset <= 0) {
        newOffset = itemSize;
      }
    }

    setOffset(newOffset);
    
    // 应用偏移量
    if (isHorizontal) {
      content.style.transform = `translateX(${-newOffset}px)`;
    } else {
      content.style.transform = `translateY(${-newOffset}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isRunning, isPaused, direction, reverse, effectiveSpeed, offset]);

  useEffect(() => {
    resetPosition();
  }, [direction, resetPosition]);

  useEffect(() => {
    if (isRunning && !isPaused) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, isPaused, animate]);

  const handleMouseEnter = () => {
    if (hoverPause) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverPause) {
      setIsPaused(false);
    }
  };

  const handleClick = (item: MarqueeItem, index: number) => {
    if (onClick) {
      onClick(item, index);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`marquee-container ${direction} ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={contentRef} 
        className="marquee-content"
        style={{
          transition: 'transform 0ms linear',
          transform: direction === 'horizontal' ? 
            `translateX(${-offset}px)` : 
            `translateY(${-offset}px)`,
          display: 'flex',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap: 0,
          margin: 0,
          padding: 0
        }}
      >
        {/* 第一份内容 */}
        <div className="marquee-group">
          {loopData.map((item, index) => (
            <div
              key={index}
              className="marquee-item"
              style={{
                height: direction === 'vertical' ? verticalItemHeight : 'auto',
                minWidth: direction === 'horizontal' ? 'auto' : '100%'
              }}
              onClick={() => handleClick(item, index)}
            >
              {item.txt}
            </div>
          ))}
        </div>
        {/* 第二份内容（中间） */}
        <div className="marquee-group">
          {loopData.map((item, index) => (
            <div
              key={`clone1-${index}`}
              className="marquee-item"
              style={{
                height: direction === 'vertical' ? verticalItemHeight : 'auto',
                minWidth: direction === 'horizontal' ? 'auto' : '100%'
              }}
              onClick={() => handleClick(item, index)}
            >
              {item.txt}
            </div>
          ))}
        </div>
        {/* 第三份内容 */}
        <div className="marquee-group">
          {loopData.map((item, index) => (
            <div
              key={`clone2-${index}`}
              className="marquee-item"
              style={{
                height: direction === 'vertical' ? verticalItemHeight : 'auto',
                minWidth: direction === 'horizontal' ? 'auto' : '100%'
              }}
              onClick={() => handleClick(item, index)}
            >
              {item.txt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
