---
name: basementuniverse-input-manager
description: Use when working with @basementuniverse/input-manager to initialise input handling, update frame state, query keyboard or mouse events, configure input options, or interpret MouseButton and KeyboardEvent.code values.
---

# Basement Universe Input Manager

Use this skill when working with `@basementuniverse/input-manager`.

The package publishes a UMD build and uses `export =`, so the module *is* the
main class. In bundlers such as webpack or Vite, use a default import from
`@basementuniverse/input-manager`; with CommonJS, `require()` returns the class
directly (there is no `.default`). Nested types and enums are reachable through
the merged namespace on that same name. When loading the build with a browser
`<script>` tag, the class is available as the `BasementUniverseInputManager` global.
The package does not publish a separate native ESM build.

This library exposes a singleton `InputManager` for browser-based games and applications. It tracks keyboard, mouse, wheel, and touch input, and provides polling methods for down, pressed, and released state.

## When To Use

Use this skill when you need to:

- initialise input handling once at startup
- call `update()` once per frame or game loop tick
- check whether keys or mouse buttons are down, pressed, or released
- read the current mouse position or hovered element
- configure which input devices are tracked
- work with `MouseButton` or `KeyboardEvent.code` values

## Workflow

1. Call `InputManager.initialise()` once before any queries.
2. Call `InputManager.update()` every frame before reading transient input state.
3. Use the polling methods to detect input.
4. Treat `keyPressed`, `keyReleased`, `mousePressed`, `mouseReleased`, `mouseWheelUp`, and `mouseWheelDown` as frame-scoped checks.
5. Call `InputManager.dispose()` on teardown to remove listeners and reset the singleton (required before re-initialising, e.g. on remount).

## Important Behavior

- `InputManager` throws if initialised more than once; call `dispose()` first to re-initialise.
- `dispose()` removes all event listeners and resets the singleton; it is a no-op if not initialised.
- `isInitialised()` reports whether the singleton is currently initialised.
- Held keys and mouse buttons are released automatically when the window loses focus (`blur`).
- Query methods throw if used before initialisation.
- `update()` copies current state to previous state and resets the mouse wheel delta.
- `mouseDown()`, `mousePressed()`, and `mouseReleased()` accept an optional `MouseButton` value.
- Touch input is mapped to the left mouse button.
- Keyboard queries use `KeyboardEvent.code` strings such as `KeyW`, `Space`, and `ArrowUp`.

## References

- Public API surface: [references/api.md](references/api.md)
- Type reference: [references/types.md](references/types.md)
- Usage patterns: [references/usage.md](references/usage.md)
