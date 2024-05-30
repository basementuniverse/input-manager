import { vec } from '@basementuniverse/vec';

export type InputOptions = {
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
};

export type MouseState = {
  button: boolean,
  position: vec,
  wheel: number
};

export type KeyboardState = {
  [key: string]: boolean;
};

export default class InputManager {
  private static instance: InputManager;

  private static readonly defaultOptions: InputOptions = {
    mouse: true,
    mouseWheel: true,
    keyboard: true,
  };

  private options: InputOptions;

  private keyboardState: KeyboardState = {};

  private previousKeyboardState: KeyboardState = {};

  private mouseState: MouseState = { button: false, position: vec(), wheel: 0 };

  private previousMouseState: MouseState = { button: false, position: vec(), wheel: 0 };

  private constructor(options?: Partial<InputOptions>) {
    this.options = Object.assign({}, InputManager.defaultOptions, options ?? {});

    // Set up event handlers
    if (this.options.mouse) {
      window.addEventListener('mousedown', () => {
        this.mouseState.button = true;
      });
      window.addEventListener('mouseup', () => {
        this.mouseState.button = false;
      });
      window.addEventListener('touchstart', () => {
        this.mouseState.button = true;
      });
      window.addEventListener('touchend', () => {
        this.mouseState.button = false;
      });
      window.addEventListener('mousemove', e => {
        this.mouseState.position.x = e.offsetX;
        this.mouseState.position.y = e.offsetY;
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

  /**
   * Update the state of the input devices
   */
  public static update() {
    const instance = InputManager.getInstance();

    instance.previousKeyboardState = Object.assign({}, instance.keyboardState);
    instance.previousMouseState = {
      ...instance.mouseState,
      position: vec.cpy(instance.mouseState.position),
    };
    instance.mouseState.wheel = 0;
  }

  /**
   * Check if a key is currently pressed down
   */
  public static keyDown(code?: string): boolean {
    const instance = InputManager.getInstance();

    // Check if any key is down
    if (!code) {
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
    if (!code) {
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

    return !!instance.keyboardState[code] && !instance.previousKeyboardState[code];
  }

  /**
   * Check if a key has been released since the last frame
   */
  public static keyReleased(code?: string): boolean {
    const instance = InputManager.getInstance();

    // Check if any key was released
    if (!code) {
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

    return !instance.keyboardState[code] && !!instance.previousKeyboardState[code];
  }

  /**
   * Check if a mouse button is currently pressed down
   */
  public static mouseDown(): boolean {
    const instance = InputManager.getInstance();

    return !!instance.mouseState.button;
  }

  /**
   * Check if a mouse button has been pressed since the last frame
   */
  public static mousePressed(): boolean {
    const instance = InputManager.getInstance();

    return !!instance.mouseState.button && !instance.previousMouseState.button;
  }

  /**
   * Check if a mouse button has been released since the last frame
   */
  public static mouseReleased(): boolean {
    const instance = InputManager.getInstance();

    return !instance.mouseState.button && !!instance.previousMouseState.button;
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
