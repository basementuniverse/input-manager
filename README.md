# Game Component: Input Manager

A component for handling input events and managing input device state.

## Installation

```bash
npm install @basementuniverse/input-manager
```

## How to use

Initialise the input manager before use:

```ts
import InputManager from '@basementuniverse/input-manager';

InputManager.initialise();
```

Update the input manager state:

```ts
class Game {
  // ...

  public update(context: CanvasRenderingContext2D) {
    InputManager.update();
  }
}
```

Check the state of input devices:

```ts
// Check if any key is currently down
InputManager.keyDown();

// Check if a specific key is currently down
InputManager.keyDown(code?);

// Check if a key was pressed
InputManager.keyPressed(code?);

// Check if a key was released
InputManager.keyReleased(code?);

// Check if the main mouse button is currently down
InputManager.mouseDown(button?);

// Check if the main mouse button was pressed
InputManager.mousePressed(button?);

// Check if the main mouse button was released
InputManager.mouseReleased(button?);

// Check if the mouse wheel was scrolled up
InputManager.mouseWheelUp();

// Check if the mouse wheel was scrolled down
InputManager.mouseWheelDown();

// Get the current mouse position in screen-space
const position = InputManager.mousePosition;

// Get the currently hovered HTML element (or null if there isn't one)
const hoveredElement = InputManager.hoveredElement;
```

See [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) for a reference of key codes.

## Options

```ts
const options = { ... };
InputManager.initialise(options);
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `element` | `Window \| HTMLElement` | `window` | The element to listen for mouse input events on |
| `mouse` | `boolean` | `true` | Enable mouse input |
| `mouseWheel` | `boolean` | `true` | Enable mouse wheel input |
| `keyboard` | `boolean` | `true` | Enable keyboard input |
| `preventContextMenu` | `boolean` | `false` | Try to prevent the context menu from appearing on right-click |
