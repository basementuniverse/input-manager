# Public API

## Browser usage

For direct browser usage, load `build/index.js` with a `<script>` tag and use
the namespaced global:

```html
<script src="build/index.js"></script>
<script>
	const instance = new BasementUniverseInputManager(/* ... */);
</script>
```

The UMD build supports CommonJS `require()` and bundlers, but native ESM
imports require a separate ESM build that this package does not currently ship.

## Overview

`InputManager` is a singleton class. Initialise it once, call `update()` every frame, and then poll state through static methods and getters.

## Static Methods

### `InputManager.initialise(options?: Partial<InputOptions>): void`
Initialises the singleton and registers event listeners.

### `InputManager.dispose(): void`
Removes all registered event listeners and resets the singleton instance. Safe to call when not initialised (no-op). After disposing, `initialise()` can be called again — useful when mounting/unmounting repeatedly.

### `InputManager.isInitialised(): boolean`
Returns whether the singleton is currently initialised.

### `InputManager.update(): void`
Copies the current input state to the previous state and clears transient wheel input. Call once per frame before polling edge-triggered methods.

### `InputManager.keyDown(code?: string): boolean`
Returns whether any key is down, or whether a specific `KeyboardEvent.code` is down.

### `InputManager.keyPressed(code?: string): boolean`
Returns whether any key was pressed this frame, or whether a specific key was pressed this frame.

### `InputManager.keyReleased(code?: string): boolean`
Returns whether any key was released this frame, or whether a specific key was released this frame.

### `InputManager.mouseDown(button?: MouseButton): boolean`
Returns whether any mouse button is down, or whether a specific `MouseButton` is down.

### `InputManager.mousePressed(button?: MouseButton): boolean`
Returns whether any mouse button was pressed this frame, or whether a specific `MouseButton` was pressed this frame.

### `InputManager.mouseReleased(button?: MouseButton): boolean`
Returns whether any mouse button was released this frame, or whether a specific `MouseButton` was released this frame.

### `InputManager.mouseWheelUp(): boolean`
Returns whether the wheel scrolled up during the current frame.

### `InputManager.mouseWheelDown(): boolean`
Returns whether the wheel scrolled down during the current frame.

## Getters

### `InputManager.mousePosition: vec2`
Returns the current mouse position in screen-space.

### `InputManager.hoveredElement: HTMLElement | null`
Returns the currently hovered HTML element, if any.

## Notes

- The package is published as `@basementuniverse/input-manager`.
- The default export is the `InputManager` class.
- Keyboard state uses `KeyboardEvent.code` values, not display labels.
- Mouse wheel state is transient and resets on every `update()` call.
