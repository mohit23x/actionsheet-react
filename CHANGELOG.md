# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2024-12-29

### ✨ Major Features & Improvements

#### 🚀 Performance Enhancements

- **60fps animations**: Optimized rendering with `requestAnimationFrame` and CSS transforms
- **Memory optimization**: Proper cleanup of event listeners and animation frames
- **React.memo**: Memoized component to prevent unnecessary re-renders
- **useCallback/useMemo**: Optimized hook dependencies for better performance

#### ♿ Accessibility Improvements

- **ARIA support**: Added `aria-label` and `aria-labelledby` props
- **Keyboard navigation**: Press Escape key to close action sheet
- **Focus management**: Automatic focus handling when opening/closing
- **Screen reader support**: Proper semantic HTML with role="dialog"

#### 🎨 Enhanced Styling & UX

- **Better default styles**: Modern design with improved border radius and shadows
- **CSS backdrop-filter**: Beautiful blur effect for background overlay
- **Improved animations**: Smoother transitions with cubic-bezier easing
- **Responsive design**: Better mobile experience

#### 🔧 Developer Experience

- **TypeScript 5.x**: Updated to latest TypeScript with strict mode
- **Modern React**: Support for React 18+ with latest hooks patterns
- **Better type definitions**: Improved TypeScript support with generic types
- **ESLint & Prettier**: Code quality tools configured
- **Modern build system**: Updated Rollup configuration

#### 📦 Build & Dependencies

- **Updated dependencies**: All packages updated to latest versions
- **Modern ES modules**: ESM support with proper tree-shaking
- **Peer dependencies**: Support for React 16.8+ (hooks support)
- **Bundle size**: Optimized bundle with zero runtime dependencies

### 🔄 Breaking Changes

1. **React version requirement**: Now requires React 16.8+ (for hooks support)
2. **TypeScript**: Better type definitions may require type updates
3. **Props changes**:
   - Added accessibility props (`aria-label`, `aria-labelledby`)
   - Updated default transition timings for better performance
4. **Build output**: ES modules format with better tree-shaking

### 📱 Example Application

- **Comprehensive demo**: Four different action sheet examples
- **Interactive playground**: Test all features and customizations
- **Modern UI**: Beautiful gradient design with responsive layout
- **Feature showcase**: Performance, accessibility, and customization demos

### 🐛 Bug Fixes

- Fixed memory leaks in animation handling
- Improved touch/mouse event handling
- Better edge case handling for dragging gestures
- Fixed focus management issues

### 📚 Documentation

- **Complete rewrite**: Comprehensive API documentation
- **Usage examples**: Multiple real-world examples
- **Migration guide**: Step-by-step migration from v1.x
- **Performance tips**: Best practices for optimal performance
- **Accessibility guide**: How to make your action sheets accessible

## [1.0.14] - Previous Version

### Features

- Basic action sheet functionality
- Touch and mouse drag support
- Background tap to close
- Customizable styling
- TypeScript support

---

For older versions, please check the git history.
