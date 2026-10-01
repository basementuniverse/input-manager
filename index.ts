import { vec2 } from '@basementuniverse/vec';

/**
 * A registered event listener, tracked so that it can be removed when the
 * input manager is disposed
 */
type RegisteredListener = {
  target: Window | HTMLElement;
  type: string;
  handler: EventListener;
};

class InputManager {
  private static instance: InputManager | undefined;
  private static readonly DEFAULT_OPTIONS: InputManager.InputOptions = {
    element: window,
    mouse: true,
    mouseWheel: true,
    keyboard: true,
    preventContextMenu: false,
  };

  private options: InputManager.InputOptions;
  private keyboardState: InputManager.KeyboardState =
    InputManager.initialKeyboardState();
  private previousKeyboardState: InputManager.KeyboardState =
    InputManager.initialKeyboardState();
  private mouseState: InputManager.MouseState =
    InputManager.initialMouseState();
  private previousMouseState: InputManager.MouseState =
    InputManager.initialMouseState();

  // Track registered listeners so they can be removed on dispose
  private listeners: RegisteredListener[] = [];

  private constructor(options?: Partial<InputManager.InputOptions>) {
    this.options = Object.assign(
      {},
      InputManager.DEFAULT_OPTIONS,
      options ?? {}
    );

    // Set up event handlers
    if (this.options.mouse) {
      this.addListener(this.options.element, 'mousedown', e => {
        this.mouseState.buttons[
          (e as MouseEvent).button as InputManager.MouseButton
        ] = true;
      });

      // Listen for mouseup on the window so that a button pressed inside the
      // element and released outside of it doesn't remain stuck down
      this.addListener(window, 'mouseup', e => {
        this.mouseState.buttons[
          (e as MouseEvent).button as InputManager.MouseButton
        ] = false;
      });
      this.addListener(this.options.element, 'touchstart', e => {
        const touch = (e as TouchEvent).touches[0];
        this.setPosition(touch.clientX, touch.clientY);
        this.mouseState.buttons[0] = true;
      });
      this.addListener(this.options.element, 'touchend', e => {
        const touch = (e as TouchEvent).changedTouches[0];
        this.setPosition(touch.clientX, touch.clientY);
        this.mouseState.buttons[0] = false;
      });
      this.addListener(this.options.element, 'touchmove', e => {
        const touch = (e as TouchEvent).touches[0];
        this.setPosition(touch.clientX, touch.clientY);
      });
      this.addListener(this.options.element, 'mousemove', e => {
        this.setPosition((e as MouseEvent).clientX, (e as MouseEvent).clientY);
        this.mouseState.hoveredElement = e.target as HTMLElement;
      });
      if (this.options.mouseWheel) {
        this.addListener(this.options.element, 'wheel', e => {
          // Ignore purely horizontal scrolling
          const deltaY = (e as WheelEvent).deltaY;
          if (deltaY !== 0) {
            this.mouseState.wheel = deltaY > 0 ? 1 : -1;
          }
        });
      }
    }

    // Keyboard events are dispatched to the focused element, and most elements
    // (including canvases) aren't focusable by default, so we listen on the
    // window regardless of which element is being used for mouse input
    if (this.options.keyboard) {
      this.addListener(window, 'keydown', e => {
        this.keyboardState[(e as KeyboardEvent).code] = true;
      });
      this.addListener(window, 'keyup', e => {
        this.keyboardState[(e as KeyboardEvent).code] = false;
      });
    }

    // Release any held keys/buttons when the window loses focus, otherwise a
    // key held while focus is lost would remain stuck down
    this.addListener(window, 'blur', () => {
      this.keyboardState = InputManager.initialKeyboardState();
      this.mouseState.buttons = InputManager.initialMouseState().buttons;
    });

    // Prevent the context menu from appearing on right-click
    if (this.options.preventContextMenu) {
      this.addListener(this.options.element, 'contextmenu', e => {
        e.preventDefault();
      });
    }
  }

  /**
   * Set the mouse position from viewport (client) coordinates, converting them
   * so that they're relative to the element's content area (or the viewport,
   * if the element is the window)
   */
  private setPosition(clientX: number, clientY: number) {
    const element = this.options.element;
    if ('getBoundingClientRect' in element) {
      const rect = element.getBoundingClientRect();
      this.mouseState.position.x = clientX - rect.left - element.clientLeft;
      this.mouseState.position.y = clientY - rect.top - element.clientTop;
    } else {
      this.mouseState.position.x = clientX;
      this.mouseState.position.y = clientY;
    }
  }

  private addListener(
    target: Window | HTMLElement,
    type: string,
    handler: EventListener
  ) {
    target.addEventListener(type, handler);
    this.listeners.push({ target, type, handler });
  }

  /**
   * Initialise the input manager for managing mouse and keyboard input
   */
  public static initialise(options?: Partial<InputManager.InputOptions>) {
    if (InputManager.instance !== undefined) {
      throw new Error('Input manager already initialised');
    }
    InputManager.instance = new InputManager(options);
  }

  /**
   * Tear down the input manager, removing all event listeners and resetting
   * the singleton instance
   *
   * After calling this, `initialise` can safely be called again. This is
   * particularly useful in environments where the input manager is created and
   * destroyed multiple times, e.g. when a component is mounted and unmounted.
   */
  public static dispose() {
    if (InputManager.instance === undefined) {
      return;
    }

    for (const { target, type, handler } of InputManager.instance.listeners) {
      target.removeEventListener(type, handler);
    }
    InputManager.instance.listeners = [];
    InputManager.instance = undefined;
  }

  /**
   * Check whether the input manager has been initialised
   */
  public static isInitialised(): boolean {
    return InputManager.instance !== undefined;
  }

  private static getInstance(): InputManager {
    if (InputManager.instance === undefined) {
      throw new Error('Input manager not properly initialised');
    }

    return InputManager.instance;
  }

  private static initialKeyboardState(): InputManager.KeyboardState {
    return {};
  }

  private static initialMouseState(): InputManager.MouseState {
    return {
      buttons: {
        [InputManager.MouseButton.Left]: false,
        [InputManager.MouseButton.Middle]: false,
        [InputManager.MouseButton.Right]: false,
      },
      position: vec2(),
      wheel: 0,
      hoveredElement: null,
    };
  }

  private static copyKeyboardState(
    state: InputManager.KeyboardState
  ): InputManager.KeyboardState {
    return Object.assign({}, state);
  }

  private static copyMouseState(
    state: InputManager.MouseState
  ): InputManager.MouseState {
    return {
      buttons: Object.assign({}, state.buttons),
      position: vec2.cpy(state.position),
      wheel: state.wheel,
      hoveredElement: state.hoveredElement,
    };
  }

  /**
   * Update the state of the input devices
   */
  public static update() {
    const instance = InputManager.getInstance();

    instance.previousKeyboardState = this.copyKeyboardState(
      instance.keyboardState
    );
    instance.previousMouseState = this.copyMouseState(instance.mouseState);
    instance.mouseState.wheel = 0;
  }

  /**
   * Check if a key is currently pressed down
   */
  public static keyDown(code?: string): boolean {
    const instance = InputManager.getInstance();

    // Check if any key is down
    if (code === undefined) {
      for (const k in instance.keyboardState) {
        if (instance.keyboardState[k]) {
          return true;
        }
      }
      return false;
    }

    return !!instance.keyboardState[code];
  }

  /**
   * Check if a key has been pressed since the last frame
   */
  public static keyPressed(code?: string): boolean {
    const instance = InputManager.getInstance();

    // Check if any key was pressed
    if (code === undefined) {
      for (const k in instance.keyboardState) {
        if (
          instance.keyboardState[k] &&
          (!(k in instance.previousKeyboardState) ||
            !instance.previousKeyboardState[k])
        ) {
          return true;
        }
      }
      return false;
    }

    return (
      !!instance.keyboardState[code] && !instance.previousKeyboardState[code]
    );
  }

  /**
   * Check if a key has been released since the last frame
   */
  public static keyReleased(code?: string): boolean {
    const instance = InputManager.getInstance();

    // Check if any key was released
    if (code === undefined) {
      for (const k in instance.keyboardState) {
        if (!instance.keyboardState[k] && !!instance.previousKeyboardState[k]) {
          return true;
        }
      }
      return false;
    }

    return (
      !instance.keyboardState[code] && !!instance.previousKeyboardState[code]
    );
  }

  /**
   * Check if a mouse button is currently pressed down
   */
  public static mouseDown(button?: InputManager.MouseButton): boolean {
    const instance = InputManager.getInstance();

    // Check if any button is down
    if (button === undefined) {
      for (const b in instance.mouseState.buttons) {
        const currentButton = +b as InputManager.MouseButton;
        if (instance.mouseState.buttons[currentButton]) {
          return true;
        }
      }
      return false;
    }

    return !!instance.mouseState.buttons[button];
  }

  /**
   * Check if a mouse button has been pressed since the last frame
   */
  public static mousePressed(button?: InputManager.MouseButton): boolean {
    const instance = InputManager.getInstance();

    // Check if any button was pressed
    if (button === undefined) {
      for (const b in instance.mouseState.buttons) {
        const currentButton = +b as InputManager.MouseButton;
        if (
          instance.mouseState.buttons[currentButton] &&
          (!(b in instance.previousMouseState.buttons) ||
            !instance.previousMouseState.buttons[currentButton])
        ) {
          return true;
        }
      }
      return false;
    }

    return (
      !!instance.mouseState.buttons[button] &&
      !instance.previousMouseState.buttons[button]
    );
  }

  /**
   * Check if a mouse button has been released since the last frame
   */
  public static mouseReleased(button?: InputManager.MouseButton): boolean {
    const instance = InputManager.getInstance();

    // Check if any button was released
    if (button === undefined) {
      for (const b in instance.mouseState.buttons) {
        const currentButton = +b as InputManager.MouseButton;
        if (
          !instance.mouseState.buttons[currentButton] &&
          !!instance.previousMouseState.buttons[currentButton]
        ) {
          return true;
        }
      }
      return false;
    }

    return (
      !instance.mouseState.buttons[button] &&
      !!instance.previousMouseState.buttons[button]
    );
  }

  /**
   * Check if the mousewheel is scrolling up
   */
  public static mouseWheelUp(): boolean {
    const instance = InputManager.getInstance();

    return instance.mouseState.wheel > 0;
  }

  /**
   * Check if the mousewheel is scrolling down
   */
  public static mouseWheelDown(): boolean {
    const instance = InputManager.getInstance();

    return instance.mouseState.wheel < 0;
  }

  /**
   * Get the current mouse position, relative to the element (or the viewport
   * if the element is the window)
   */
  public static get mousePosition(): vec2 {
    const instance = InputManager.getInstance();

    return instance.mouseState.position;
  }

  /**
   * Get the currently hovered element
   */
  public static get hoveredElement(): HTMLElement | null {
    const instance = InputManager.getInstance();

    return instance.mouseState.hoveredElement ?? null;
  }
}

namespace InputManager {
  export enum MouseButton {
    Left = 0,
    Middle = 1,
    Right = 2,
  }

  export type InputOptions = {
    /**
     * The element on which to track mouse, touch and wheel input
     *
     * Mouse positions will be relative to this element. Keyboard input is
     * always tracked on the window, since keyboard events are only dispatched
     * to the focused element
     *
     * Defaults to the window
     */
    element: Window | HTMLElement;

    /**
     * Whether to track mouse input
     */
    mouse: boolean;

    /**
     * Whether to track the mouse wheel
     */
    mouseWheel: boolean;

    /**
     * Whether to track keyboard input
     */
    keyboard: boolean;

    /**
     * Whether to prevent the context menu from appearing on right-click
     */
    preventContextMenu: boolean;
  };

  export type MouseState = {
    buttons: { [key in MouseButton]: boolean };
    position: vec2;
    wheel: number;
    hoveredElement?: HTMLElement | null;
  };

  export type KeyboardState = {
    [key: string]: boolean;
  };
}

export = InputManager;
