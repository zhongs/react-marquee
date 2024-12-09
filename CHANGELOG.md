# Changelog

## [2.0.0] - 2024-12-09

### Breaking Changes
- 升级到 React 18
- 迁移到 TypeScript
- 使用 Vite 替代 Webpack 作为构建工具
- 更新了组件 API 以支持 TypeScript 类型

### Added
- 添加完整的 TypeScript 类型定义
- 添加 ESM 和 CommonJS 双模块格式支持
- 添加 Vitest 测试支持
- 添加更好的无缝滚动支持
- 添加反向滚动功能优化

### Changed
- 重构为函数组件
- 使用 CSS transform 替代 scroll 实现更流畅的动画
- 优化滚动逻辑，提供更好的性能
- 改进文档和示例

### Fixed
- 修复反向滚动不连续的问题
- 修复滚动重置时的视觉跳动

