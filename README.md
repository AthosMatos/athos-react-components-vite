# ATHOS React Components

A set of useful ReactJS components developed by Athos.

## Installation

```bash
npm install @athosws/react-components
# or
pnpm install @athosws/react-components
# or
yarn add @athosws/react-components
```

## Components

### Module Components (Full-featured)

| Component | Description |
|-----------|-------------|
| `ATHOSButton` | Versatile button with multiple styles and tooltip support |
| `ATHOSInput` | Customizable input component |
| `ATHOSSelect` | Dropdown select component |
| `ATHOSModal` | Modal dialog component |
| `ATHOSToast` | Toast notification system |
| `ATHOSTooltip` | Tooltip component |
| `ATHOSCollapse` | Collapsible content component |
| `ATHOSDropDown` | Dropdown menu component |
| `ATHOSPopUp` | Popup component |
| `ATHOSTabs` | Tab navigation component |
| `ATHOSCards` | Draggable card components |
| `ATHOSBreadcrumbs` | Breadcrumb navigation |
| `ATHOSDynamicTable` | Dynamic table with sorting/filtering |
| `ATHOSResizableDiv` | Resizable container |
| `ATHOSSwitcher` | Toggle switch component |
| `ATHOSTreeview` | Tree view component |
| `ATHOSVirtualDiv` | Virtualized list container |
| `ATHOSMenu` | Navigation menu component |

### Light Module Components (Lightweight)

| Component | Description |
|-----------|-------------|
| `LightButton` | Lightweight button component |
| `LightInput` | Lightweight input component |
| `LightList` | Lightweight list component |
| `LightPopover` | Lightweight popover component |
| `LightSelect` | Lightweight select component |
| `LightTable` | Lightweight table component |

## Usage

```jsx
import { 
  ATHOSButton, 
  ATHOSInput, 
  LightButton, 
  LightSelect 
} from "@athosws/react-components";

function App() {
  return (
    <div>
      <ATHOSButton type="default" onClick={() => console.log("Clicked!")}>
        Click Me
      </ATHOSButton>
      
      <LightButton buttontype="primary">
        Light Button
      </LightButton>
    </div>
  );
}
```

## Peer Dependencies

This library requires the following peer dependencies:

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "tailwindcss": "^4.1.8",
  "daisyui": "^5.0.43",
  "motion": "^12.15.0"
}
```

## Publishing to npm

```bash
# Build the package
pnpm build

# Publish (scoped packages require --access public)
npm publish --access public
```

---

## ATHOSButton Component

The `ATHOSButton` component is a versatile button component that supports multiple styles and states, such as `default`, `alt`, `action`, and `disabled`. It allows for customization of colors, text, and additional styling. It also supports an optional tooltip that provides extra information when hovering over the button.

![Animation](https://github.com/user-attachments/assets/704ef217-8c76-42f7-b3f9-1f094a30c227)

### Import

```javascript
import { ATHOSButton } from "@athosws/react-components";
```

### Basic Usage

```jsx
import React from "react";
import { ATHOSButton } from "@athosws/react-components";

const App = () => {
  return (
    <ATHOSButton type="default" onClick={() => console.log("Button clicked!")}>
      Click Me
    </ATHOSButton>
  );
};

export default App;
```

### With Tooltip

```jsx
<ATHOSButton 
  type="action" 
  tooltip="This is an action button" 
  onClick={() => console.log("Action button clicked!")}
>
  Action
</ATHOSButton>
```

### Disabled State

```jsx
<ATHOSButton disabled={true}>Disabled Button</ATHOSButton>
```

### Props

| Prop        | Type                       | Description                                                                 | Default           |
| ----------- | -------------------------- | --------------------------------------------------------------------------- | ----------------- |
| `type`      | `"default","alt","action"` | Specifies the button style. Required if `disabled` is not set.              | `"default"`       |
| `onClick`   | `() => void`               | Function to call when the button is clicked.                                | `undefined`       |
| `children`  | `React.ReactNode`          | The content to be displayed inside the button.                              | `undefined`       |
| `tooltip`   | `React.ReactNode`          | Content to be shown as a tooltip when hovering over the button.             | `undefined`       |
| `disabled`  | `boolean`                  | If `true`, the button is disabled and does not respond to click events.     | `false`           |
| `style`     | `React.CSSProperties`      | Custom styles to apply to the button.                                       | `undefined`       |
| `color`     | `string`                   | Background color of the button.                                             | `Depends on type` |
| `textColor` | `string`                   | Text color of the button.                                                   | `Depends on type` |

---

## Author

Athos Matos - ladiesman217.as@gmail.com
