# Usage Patterns

## Basic Setup

```ts
import InputManager, { MouseButton } from '@basementuniverse/input-manager';

InputManager.initialise({
  element: canvas,
  preventContextMenu: true,
});

function gameLoop() {
  InputManager.update();

  if (InputManager.keyDown('KeyW')) {
    // move forward
  }

  if (InputManager.keyPressed('Space')) {
    // jump
  }

  if (InputManager.mousePressed(MouseButton.Left)) {
    // fire
  }
}
```

## Good Practices

- Call `initialise()` once only (or call `dispose()` before re-initialising).
- Call `dispose()` when tearing down to remove listeners and reset the singleton.
- Call `update()` before reading `keyPressed`, `keyReleased`, `mousePressed`, `mouseReleased`, `mouseWheelUp`, or `mouseWheelDown`.
- Use `KeyboardEvent.code` strings such as `KeyA`, `Space`, and `ArrowLeft`.
- Use `MouseButton.Left`, `MouseButton.Middle`, and `MouseButton.Right` instead of raw numbers when possible.

## Teardown / Remounting

In environments where the manager is created and destroyed repeatedly (e.g. a
React component that mounts and unmounts), dispose on teardown and re-initialise
on setup:

```ts
// on mount / setup
InputManager.initialise({ element: canvas });

// on unmount / teardown
InputManager.dispose();
```

`dispose()` removes all event listeners and is a no-op if not initialised, so it
is safe to call unconditionally. Held keys and mouse buttons are also
automatically released when the window loses focus (`blur`).

## Common Options

- `element`: choose the DOM element that should receive mouse events.
- `mouse`: disable when only keyboard input is needed.
- `mouseWheel`: disable if wheel input is irrelevant.
- `keyboard`: disable if you only need pointer input.
- `preventContextMenu`: enable when right-click should not open the browser menu.
