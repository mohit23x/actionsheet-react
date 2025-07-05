# ActionSheet-React

[![Size](https://badgen.net/bundlephobia/minzip/actionsheet-react)](https://bundlephobia.com/result?p=actionsheet-react)
[![npm](https://badgen.net//npm/v/actionsheet-react)](https://www.npmjs.com/package/actionsheet-react)
[![TypeScript](https://badgen.net/badge/-/TypeScript/blue?icon=typescript)](https://www.typescriptlang.org/)
[![License](https://badgen.net/badge/license/ISC/blue)](https://github.com/mohit23x/actionsheet-react/blob/main/LICENSE)

🌟 A lightweight, performant, and accessible action sheet component for React with modern features and best practices.

## ✨ Features

- 🚀 **High Performance**: 60fps animations with optimized rendering
- ♿ **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- 📱 **Touch Friendly**: Responsive gestures for mobile devices
- 🎨 **Customizable**: Full control over styling and behavior
- 🔧 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 📦 **Lightweight**: Minimal bundle size with zero dependencies
- ⚡ **Modern React**: Built with React 18+ features and hooks
- 🎯 **Position Flexible**: Support for bottom and top positioned sheets

## 📺 Demo

![demo gif](https://s7.gifyu.com/images/demo_action_sheet.gif)

[CodeSandbox](https://codesandbox.io/p/sandbox/hgx6gx)

## 📦 Installation

```bash
# Using npm
npm install actionsheet-react

# Using yarn
yarn add actionsheet-react

# Using pnpm
pnpm add actionsheet-react
```

## 🚀 Quick Start

```tsx
import React, { useRef } from "react";
import ActionSheet from "actionsheet-react";

function MyComponent() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <div>
      <button onClick={() => actionSheetRef.current?.open()}>
        Open Action Sheet
      </button>

      <ActionSheet
        ref={actionSheetRef}
        onClose={() => console.log("Closed!")}
        aria-label="Example action sheet"
      >
        <div style={{ padding: "20px" }}>
          <h3>Hello World!</h3>
          <p>This is a basic action sheet.</p>
          <button onClick={() => actionSheetRef.current?.close()}>Close</button>
        </div>
      </ActionSheet>
    </div>
  );
}
```

## 📖 API Reference

### Props

| Prop              | Type            | Default                                         | Description                                            |
| ----------------- | --------------- | ----------------------------------------------- | ------------------------------------------------------ |
| `onClose`         | `() => void`    | `undefined`                                     | Callback fired when the action sheet is closed         |
| `children`        | `ReactNode`     | `undefined`                                     | Content to render inside the action sheet              |
| `bgStyle`         | `CSSProperties` | `{}`                                            | Custom styles for the background overlay               |
| `sheetStyle`      | `CSSProperties` | `{}`                                            | Custom styles for the sheet container                  |
| `mouseEnable`     | `boolean`       | `true`                                          | Enable mouse/pointer interactions for dragging         |
| `touchEnable`     | `boolean`       | `true`                                          | Enable touch interactions for dragging                 |
| `threshold`       | `number`        | `50`                                            | Threshold in pixels for triggering close when dragging |
| `opacity`         | `number`        | `1`                                             | Opacity of the background overlay when visible         |
| `zIndex`          | `number`        | `998`                                           | z-index value for the action sheet                     |
| `closeOnBgTap`    | `boolean`       | `true`                                          | Allow closing when clicking on the background          |
| `bgTransition`    | `string`        | `"opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)"`   | CSS transition for background                          |
| `className`       | `string`        | `"action-sheet"`                                | CSS class name for the background overlay              |
| `sheetTransition` | `string`        | `"transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"` | CSS transition for sheet                               |
| `reverse`         | `boolean`       | `false`                                         | Position the sheet at the top instead of bottom        |
| `aria-label`      | `string`        | `undefined`                                     | ARIA label for accessibility                           |
| `aria-labelledby` | `string`        | `undefined`                                     | ARIA labelledby for accessibility                      |

### Ref Methods

| Method     | Description                                 |
| ---------- | ------------------------------------------- |
| `open()`   | Open the action sheet                       |
| `close()`  | Close the action sheet                      |
| `isOpen()` | Check if the action sheet is currently open |

## 🎯 Usage Examples

### Basic Usage

```tsx
import React, { useRef } from "react";
import ActionSheet, { ActionSheetRef } from "actionsheet-react";

function BasicExample() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <>
      <button onClick={() => actionSheetRef.current?.open()}>
        Open Basic Sheet
      </button>

      <ActionSheet ref={actionSheetRef}>
        <div style={{ padding: "20px" }}>
          <h3>Basic Action Sheet</h3>
          <p>Drag down, click background, or press Escape to close.</p>
        </div>
      </ActionSheet>
    </>
  );
}
```

### Top Position Sheet

```tsx
function TopSheetExample() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <>
      <button onClick={() => actionSheetRef.current?.open()}>
        Open Top Sheet
      </button>

      <ActionSheet
        ref={actionSheetRef}
        reverse={true}
        aria-label="Top positioned action sheet"
      >
        <div style={{ padding: "20px" }}>
          <h3>Top Action Sheet</h3>
          <p>This sheet slides down from the top!</p>
        </div>
      </ActionSheet>
    </>
  );
}
```

### Custom Styled Sheet

```tsx
function CustomStyledExample() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <>
      <button onClick={() => actionSheetRef.current?.open()}>
        Open Custom Sheet
      </button>

      <ActionSheet
        ref={actionSheetRef}
        bgStyle={{ backgroundColor: "rgba(139, 69, 19, 0.8)" }}
        sheetStyle={{
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          borderRadius: "20px 20px 0 0",
        }}
        aria-label="Custom styled action sheet"
      >
        <div style={{ padding: "20px" }}>
          <h3>Custom Styled Sheet</h3>
          <p>This sheet has custom background and styling.</p>
        </div>
      </ActionSheet>
    </>
  );
}
```

### Action List Example

```tsx
function ActionListExample() {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [selectedAction, setSelectedAction] = useState("");

  const handleAction = (action: string) => {
    setSelectedAction(action);
    actionSheetRef.current?.close();
  };

  return (
    <>
      <button onClick={() => actionSheetRef.current?.open()}>
        Open Action List
      </button>

      <ActionSheet ref={actionSheetRef} threshold={80}>
        <div>
          <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
            <h3>Choose an Action</h3>
          </div>
          <div>
            {["Share", "Edit", "Copy Link", "Download", "Delete"].map(
              action => (
                <button
                  key={action}
                  onClick={() => handleAction(action)}
                  style={{
                    width: "100%",
                    padding: "15px 20px",
                    border: "none",
                    background: "white",
                    borderBottom: "1px solid #f0f0f0",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {action}
                </button>
              )
            )}
          </div>
        </div>
      </ActionSheet>

      {selectedAction && <p>Selected: {selectedAction}</p>}
    </>
  );
}
```

## ♿ Accessibility

ActionSheet-React is built with accessibility in mind:

- **ARIA Support**: Proper ARIA attributes for screen readers
- **Keyboard Navigation**: Press `Escape` to close the sheet
- **Focus Management**: Automatic focus handling when opening/closing
- **Screen Reader Support**: Compatible with popular screen readers

### Accessibility Best Practices

```tsx
<ActionSheet
  ref={actionSheetRef}
  aria-label="User settings"
  // or
  aria-labelledby="settings-title"
>
  <div>
    <h3 id="settings-title">User Settings</h3>
    {/* Content */}
  </div>
</ActionSheet>
```

## 🎨 Styling

### CSS Custom Properties

You can use CSS custom properties for consistent theming:

```css
:root {
  --actionsheet-bg-color: rgba(0, 0, 0, 0.5);
  --actionsheet-sheet-bg: #ffffff;
  --actionsheet-border-radius: 16px;
  --actionsheet-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-sheet {
  background-color: var(--actionsheet-bg-color);
}
```

### Custom Animations

```tsx
<ActionSheet
  bgTransition="opacity 0.5s ease-in-out"
  sheetTransition="transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
>
  {/* Content */}
</ActionSheet>
```

## 🚀 Performance Tips

1. **Memoize Content**: Use `React.memo` for complex sheet content
2. **Optimize Images**: Use appropriate image formats and sizes
3. **Avoid Heavy Computations**: Keep sheet content lightweight
4. **Use CSS Transforms**: Prefer CSS transforms over changing layout properties

```tsx
const OptimizedSheetContent = memo(({ data }) => (
  <div>{/* Heavy content here */}</div>
));

<ActionSheet ref={ref}>
  <OptimizedSheetContent data={data} />
</ActionSheet>;
```

## 🔄 Migration from v1.x

### Breaking Changes

1. **React Version**: Now requires React 16.8+
2. **TypeScript**: Better type definitions
3. **Props**: Some prop names have changed for clarity
4. **Accessibility**: New ARIA props added

### Migration Guide

```tsx
// v1.x
<ActionSheet
  ref={ref}
  onClose={handleClose}
  bgTransition="opacity 0.5s ease-in-out, z-index 0.5s ease-in-out"
/>

// v2.x
<ActionSheet
  ref={ref}
  onClose={handleClose}
  bgTransition="opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  aria-label="Action sheet"
/>
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

ISC © [mohit23x](https://github.com/mohit23x)

## 🙏 Credits

Built with ❤️ by [mohit23x](https://github.com/mohit23x)

````

### 👨‍💻 Usage

##### Sample code using Javascript

```javascript
import React, { useRef, Fragment } from "react";
import ActionSheet from "actionsheet-react";

const MyComponent = () => {
  const ref = useRef();

  const handleOpen = () => {
    ref.current.open();
  };

  const handleClose = () => {
    ref.current.close();
  };

  return (
    <Fragment>
      <button onClick={handleOpen}>Open</button>
      <button onClick={handleClose}>Close</button>
      <ActionSheet ref={ref}>
        <div style={style.content}>🙂 Hi React Devs!</div>
      </ActionSheet>
    </Fragment>
  );
};

const style = {
  content: {
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
````

##### Sample code using Typescript

```typescript
import ActionSheet, {ActionSheetRef} from 'actionsheet-react';

const MyComponent = () => {
  const ref = useRef<ActionSheetRef>();

  // ...rest same as above code

```

### 🌮 Props

##### all props are optional

| property name   | type              | more info                                                                                                          |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| onClose         | callback function | called when the actionsheet is closed                                                                              |
| children        | React Children    | all the fancy HTML elements that you want to show in the menu                                                      |
| bgStyle         | css styles object | these styles are applied to the background black overlay                                                           |
| sheetStyle      | css styles object | these styles are applied to the sheet component                                                                    |
| mouseEnable     | boolean           | if true, the sheet can be dragged down using mouse                                                                 |
| touchEnable     | boolean           | if true, the sheet can be swiped down on touch devices                                                             |
| threshold       | number            | the minimum distance dragged, so that sheet will slide down. Threshold is measured in **px** , default value is 50 |
| zIndex          | number            | the default value is **999**                                                                                       |
| closeOnBgTap    | boolean           | if true, the sheet is closed when the background overlay is tapped                                                 |
| reverse         | boolean           | open the sheet in reverse direction                                                                                |
| sheetTransition | string            | css transition shorthand, default value `transform 0.3s ease-in-out`                                               |
| bgTransition    | string            | css transition shorthand, default value `opacity 0.5s ease-in-out, z-index 0.5s ease-in-out`                       |

### 👾 Misc

1. The logic to stop the backgroud from scrolling is not implemented in this package just to keep it simple. To avoid the background from scrolling you can toggle the overflow property of the body tag, or you can also use some other way of your choice

```javascript
document.body.style.overflow = "hidden";
document.body.style.overflow = "auto";
```

2. Mobile browsers generally have pull-to-refresh and when action sheet is open and when user drags the sheet down the pull-to-refresh is triggered. To control this behavior either you can disable swipe in action sheet `touchEnable={false}` or you can disable pull-to-refresh.

```css
body {
  overscroll-behavior: contain;
}
```

### ⛳ Issues/Feature Request/Pull Request

The github repo is always there for you.
