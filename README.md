# ActionSheet-React

[![Size](https://badgen.net/bundlephobia/minzip/actionsheet-react)](https://bundlephobia.com/result?p=actionsheet-react)
[![npm](https://badgen.net//npm/v/actionsheet-react)](https://www.npmjs.com/package/actionsheet-react)

An action sheet component for react.

#### What is an action sheet ?

Action Sheet is a component that slides in from bottom and has some list of action for the user. Mostly action sheets are used in native mobile application, but action sheet is a very helpful UI element which can be also be used in websites and PWA.

### 📺 Demo

![demo gif](https://s7.gifyu.com/images/demo_action_sheet.gif)

[code-sandbox simple example](https://codesandbox.io/s/actionsheet-react-2s5zf)

[code-sandbox complex example](https://codesandbox.io/s/actionsheet-react-example-1-0nok0)

### 📦 Installation

##### using npm

```bash
npm i actionsheet-react
```

##### using yarn

```bash
yarn add actionsheet-react
```

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
```

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
