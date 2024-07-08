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
InputManager.keyDown(code);

// Check if a key was pressed
InputManager.keyPressed(code?);

// Check if a key was released
InputManager.keyReleased(code?);

// Check if the main mouse button is currently down
InputManager.mouseDown();

// Check if the main mouse button was pressed
InputManager.mousePressed();

// Check if the main mouse button was released
InputManager.mouseReleased();

// Check if the mouse wheel was scrolled up
InputManager.mouseWheelUp();

// Check if the mouse wheel was scrolled down
InputManager.mouseWheelDown();

// Get the current mouse position in screen-space
const position = InputManager.mousePosition;
```

See [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) for a reference of key codes.

## Options

```ts
const options = { ... };
InputManager.initialise(options);
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `mouse` | `boolean` | `true` | Enable mouse input |
| `mouseWheel` | `boolean` | `true` | Enable mouse wheel input |
| `keyboard` | `boolean` | `true` | Enable keyboard input |
