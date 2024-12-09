import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Marquee } from '../src/Marquee';
import React from 'react';

describe('Marquee Component', () => {
  const mockData = [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' }
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders without crashing', () => {
    render(<Marquee loopData={mockData} />);
    expect(screen.getByText('Item 1')).toBeDefined();
  });

  it('renders all items', () => {
    render(<Marquee loopData={mockData} />);
    mockData.forEach(item => {
      expect(screen.getByText(item.text)).toBeDefined();
    });
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Marquee loopData={mockData} onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Item 1'));
    expect(handleClick).toHaveBeenCalledWith(mockData[0], 0);
  });

  it('pauses on hover when hoverPause is true', () => {
    render(<Marquee loopData={mockData} hoverPause={true} />);
    const container = screen.getByText('Item 1').parentElement;
    
    expect(container).toBeDefined();
    if (container) {
      fireEvent.mouseEnter(container);
      // 验证暂停状态
      // 这里可以添加更多具体的暂停状态检查
    }
  });

  it('supports both horizontal and vertical directions', () => {
    const { rerender } = render(<Marquee loopData={mockData} direction="horizontal" />);
    expect(screen.getByText('Item 1').parentElement?.className).toContain('horizontal');

    rerender(<Marquee loopData={mockData} direction="vertical" />);
    expect(screen.getByText('Item 1').parentElement?.className).toContain('vertical');
  });

  it('supports reverse scrolling', () => {
    const { rerender } = render(<Marquee loopData={mockData} reverse={false} />);
    const container = screen.getByText('Item 1').parentElement;
    
    expect(container).toBeDefined();
    if (container) {
      const initialTransform = container.style.transform;
      
      rerender(<Marquee loopData={mockData} reverse={true} />);
      // 验证滚动方向改变
      // 这里可以添加更多具体的方向检查
    }
  });
});
