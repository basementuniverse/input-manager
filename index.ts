import { vec } from '@basementuniverse/vec';

export type InputOptions = {
  /**
   * The element on which to track mouse input
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
  buttons: Record<number, boolean>,
  position: vec,
  wheel: number
};

export type KeyboardState = {
  [key: string]: boolean;
};

export default class InputManager {
  private static instance: InputManager;

  private static readonly defaultOptions: InputOptions = {
    element: window,
    mouse: true,
    mouseWheel: true,
    keyboard: true,
    preventContextMenu: false,
  };

  private options: InputOptions;

  private keyboardState: KeyboardState = InputManager.initialKeyboardState();
  private previousKeyboardState: KeyboardState = InputManager.initialKeyboardState();

  private mouseState: MouseState = InputManager.initialMouseState();
  private previousMouseState: MouseState = InputManager.initialMouseState();

  private constructor(options?: Partial<InputOptions>) {
    this.options = Object.assign({}, InputManager.defaultOptions, options ?? {});

    // Set up event handlers
    if (this.options.mouse) {
      this.options.element.addEventListener('mousedown', e => {
        this.mouseState.buttons[(e as MouseEvent).button] = true;
      });
      this.options.element.addEventListener('mouseup', e => {
        this.mouseState.buttons[(e as MouseEvent).button] = false;
      });
      this.options.element.addEventListener('touchstart', () => {
        this.mouseState.buttons[0] = true;
      });
      this.options.element.addEventListener('touchend', () => {
        this.mouseState.buttons[0] = false;
      });
      this.options.element.addEventListener('mousemove', e => {
        this.mouseState.position.x = (e as MouseEvent).offsetX;
        this.mouseState.position.y = (e as MouseEvent).offsetY;
      });
      if (this.options.mouseWheel) {
        window.addEventListener('wheel', e => {
          this.mouseState.wheel = e.deltaY > 0 ? 1 : -1;
        });
      }
    }
    if (this.options.keyboard) {
      window.addEventListener('keydown', e => {
        this.keyboardState[e.code] = true;
      });
      window.addEventListener('keyup', e => {
        this.keyboardState[e.code] = false;
      });
    }

    // Prevent the context menu from appearing on right-click
    if (this.options.preventContextMenu) {
      this.options.element.addEventListener('contextmenu', e => {
        e.preventDefault();
      });
    }
  }

  /**
   * Initialise the input manager for managing mouse and keyboard input
   */
  public static initialise(options?: Partial<InputOptions>) {
    if (InputManager.instance !== undefined) {
      throw new Error('Input manager already initialised');
    }
    InputManager.instance = new InputManager(options);
  }

  private static getInstance(): InputManager {
    if (InputManager.instance === undefined) {
      throw new Error('Input manager not properly initialised');
    }

    return InputManager.instance;
  }

  private static initialKeyboardState(): KeyboardState {
    return {};
  }

  private static initialMouseState(): MouseState {
    return { buttons: {}, position: vec(), wheel: 0 };
  }

  private static copyKeyboardState(state: KeyboardState): KeyboardState {
    return Object.assign({}, state);
  }

  private static copyMouseState(state: MouseState): MouseState {
    return {
      buttons: Object.assign({}, state.buttons),
      position: vec.cpy(state.position),
      wheel: state.wheel,
    };
  }

  /**
   * Update the state of the input devices
   */
  public static update() {
    const instance = InputManager.getInstance();

    instance.previousKeyboardState = this.copyKeyboardState(instance.keyboardState);
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
          (
            !(k in instance.previousKeyboardState) ||
            !instance.previousKeyboardState[k]
          )
        ) {
          return true;
        }
      }
      return false;
    }

    return (
      !!instance.keyboardState[code] &&
      !instance.previousKeyboardState[code]
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
        if (
          !instance.keyboardState[k] &&
          !!instance.previousKeyboardState[k]
        ) {
          return true;
        }
      }
      return false;
    }

    return (
      !instance.keyboardState[code] &&
      !!instance.previousKeyboardState[code]
    );
  }

  /**
   * Check if a mouse button is currently pressed down
   */
  public static mouseDown(button?: number): boolean {
    const instance = InputManager.getInstance();

    // Check if any button is down
    if (button === undefined) {
      for (const b in instance.mouseState.buttons) {
        if (instance.mouseState.buttons[b]) {
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
  public static mousePressed(button?: number): boolean {
    const instance = InputManager.getInstance();

    // Check if any button was pressed
    if (button === undefined) {
      for (const b in instance.mouseState.buttons) {
        if (
          instance.mouseState.buttons[b] &&
          (
            !(b in instance.previousMouseState.buttons) ||
            !instance.previousMouseState.buttons[b]
          )
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
  public static mouseReleased(button?: number): boolean {
    const instance = InputManager.getInstance();

    // Check if any button was released
    if (button === undefined) {
      for (const b in instance.mouseState.buttons) {
        if (
          !instance.mouseState.buttons[b] &&
          !!instance.previousMouseState.buttons[b]
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
   * Get the current mouse position in screen-space
   */
  public static get mousePosition(): vec {
    const instance = InputManager.getInstance();

    return instance.mouseState.position;
  }
}
