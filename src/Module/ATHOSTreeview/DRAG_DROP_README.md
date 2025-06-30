# ATHOSTreeview Drag & Drop

The ATHOSTreeview component now supports drag and drop functionality, allowing you to drag items between different trees or reorganize items within the same tree.

## Features

- **Single Tree Drag & Drop**: Drag items within a single tree to reorganize
- **Multi-Tree Drag & Drop**: Drag items between different trees
- **Visual Feedback**: Drag overlay and drop zone highlighting
- **Flexible Configuration**: Enable/disable drag and drop per tree
- **Type Safety**: Full TypeScript support

## Components

### ATHOSTreeview (Single Tree)

The standard treeview component with optional drag and drop support.

```tsx
import { ATHOSTreeview } from "@athosws/react-components";

<ATHOSTreeview
  data={treeData}
  enableDragAndDrop={true}
  treeId="my-tree"
  onDropBetweenTrees={(draggedItem, targetTreeId, targetParentId) => {
    // Handle drop logic
  }}
  // ... other props
/>;
```

### ATHOSTreeviewSimple (Multi-Tree Setup)

A simplified version without built-in DndContext, designed for multi-tree setups.

```tsx
import { ATHOSTreeviewSimple } from "@athosws/react-components";

<ATHOSTreeviewSimple
  treeId="tree-1" // Required for multi-tree
  data={tree1Data}
  enableDragAndDrop={true}
  // ... other props
/>;
```

### ATHOSTreeviewMultiDndProvider

Wrapper component that manages drag and drop between multiple trees.

```tsx
import { ATHOSTreeviewMultiDndProvider, ATHOSTreeviewSimple } from "@athosws/react-components";

<ATHOSTreeviewMultiDndProvider
  onDropBetweenTrees={(draggedItem, targetTreeId, targetParentId) => {
    // Handle item movement between trees
  }}
>
  <ATHOSTreeviewSimple treeId="tree1" data={tree1Data} enableDragAndDrop />
  <ATHOSTreeviewSimple treeId="tree2" data={tree2Data} enableDragAndDrop />
</ATHOSTreeviewMultiDndProvider>;
```

## Complete Example

```tsx
import React, { useState } from "react";
import { ATHOSTreeviewMultiDndProvider, ATHOSTreeviewSimple, CrumbType } from "@athosws/react-components";

const MyComponent = () => {
  const [tree1Data, setTree1Data] = useState<Record<string, CrumbType>>({
    folder1: {
      id: "folder1",
      name: "Documents",
      sub: {
        file1: {
          id: "file1",
          name: "Report.pdf",
        },
      },
    },
  });

  const [tree2Data, setTree2Data] = useState<Record<string, CrumbType>>({
    folder2: {
      id: "folder2",
      name: "Projects",
    },
  });

  const handleDropBetweenTrees = (draggedItem, targetTreeId, targetParentId) => {
    // Remove from source tree
    if (draggedItem.sourceTreeId === "tree1") {
      setTree1Data(removeItemFromTree(tree1Data, draggedItem.id));
    } else {
      setTree2Data(removeItemFromTree(tree2Data, draggedItem.id));
    }

    // Add to target tree
    if (targetTreeId === "tree1") {
      setTree1Data(addItemToTree(tree1Data, draggedItem.crumb, targetParentId));
    } else {
      setTree2Data(addItemToTree(tree2Data, draggedItem.crumb, targetParentId));
    }
  };

  return (
    <ATHOSTreeviewMultiDndProvider onDropBetweenTrees={handleDropBetweenTrees}>
      <div className="grid grid-cols-2 gap-4">
        <ATHOSTreeviewSimple treeId="tree1" data={tree1Data} enableDragAndDrop={true} />
        <ATHOSTreeviewSimple treeId="tree2" data={tree2Data} enableDragAndDrop={true} />
      </div>
    </ATHOSTreeviewMultiDndProvider>
  );
};
```

## Props

### Drag & Drop Specific Props

| Prop                 | Type       | Description                                              |
| -------------------- | ---------- | -------------------------------------------------------- |
| `enableDragAndDrop`  | `boolean`  | Enable/disable drag and drop functionality               |
| `treeId`             | `string`   | Unique identifier for the tree (required for multi-tree) |
| `onDragStart`        | `function` | Callback when drag starts                                |
| `onDragOver`         | `function` | Callback during drag over                                |
| `onDragEnd`          | `function` | Callback when drag ends                                  |
| `onDropBetweenTrees` | `function` | Callback when item is dropped between trees              |

### DraggedItem Interface

```tsx
interface DraggedItem {
  id: string;
  crumb: CrumbType;
  sourceTreeId: string;
  sourceParentId?: string;
}
```

## Helper Functions

You'll need to implement helper functions to manage your tree data:

```tsx
// Add item to tree
const addItemToTree = (tree, item, parentId) => {
  // Implementation depends on your data structure
};

// Remove item from tree
const removeItemFromTree = (tree, itemId) => {
  // Implementation depends on your data structure
};

// Find item in tree
const findItemInTree = (tree, itemId) => {
  // Implementation depends on your data structure
};
```

## Dependencies

The drag and drop functionality uses [@dnd-kit](https://dndkit.com/):

- `@dnd-kit/core`
- `@dnd-kit/sortable`
- `@dnd-kit/utilities`

These are already included as dependencies in the package.

## Styling

The component provides visual feedback during drag operations:

- Dragged items become semi-transparent
- Drop zones highlight with a blue border
- Drag overlay shows the item being dragged

You can customize the styling using the existing `styles` prop on the treeview components.
