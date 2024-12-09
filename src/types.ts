export interface MarqueeItem {
  txt: string;
  [key: string]: any;
}

export interface MarqueeProps {
  /**
   * 循环显示的数据数组
   */
  loopData: MarqueeItem[];
  
  /**
   * 滚动方向，可选 'horizontal' 或 'vertical'
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  
  /**
   * 滚动速度，可选。如果不提供，将根据内容长度自动计算合适的速度。
   * 水平方向：内容越长，速度适当增加（每20个字符增加1的速度，上限为8）
   * 垂直方向：保持相对稳定的速度（仅根据内容长度做小幅调整）
   */
  speed?: number;
  
  /**
   * 垂直滚动时的单项高度
   * @default '60px'
   */
  verticalItemHeight?: string;
  
  /**
   * 是否反向滚动
   * @default false
   */
  reverse?: boolean;
  
  /**
   * 鼠标悬停时是否暂停
   * @default false
   */
  hoverPause?: boolean;
  
  /**
   * 是否自动播放
   * @default true
   */
  autoPlay?: boolean;
  
  /**
   * 点击事件回调
   */
  onClick?: (item: MarqueeItem, index: number) => void;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}
