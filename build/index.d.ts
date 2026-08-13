import { vec2 } from '@basementuniverse/vec';
declare class InputManager {
    private static instance;
    private static readonly DEFAULT_OPTIONS;
    private options;
    private keyboardState;
    private previousKeyboardState;
    private mouseState;
    private previousMouseState;
    private listeners;
    private constructor();
    private addListener;
    /**
     * Initialise the input manager for managing mouse and keyboard input
     */
    static initialise(options?: Partial<InputManager.InputOptions>): void;
    /**
     * Tear down the input manager, removing all event listeners and resetting
     * the singleton instance
     *
     * After calling this, `initialise` can safely be called again. This is
     * particularly useful in environments where the input manager is created and
     * destroyed multiple times, e.g. when a component is mounted and unmounted.
     */
    static dispose(): void;
    /**
     * Check whether the input manager has been initialised
     */
    static isInitialised(): boolean;
    private static getInstance;
    private static initialKeyboardState;
    private static initialMouseState;
    private static copyKeyboardState;
    private static copyMouseState;
    /**
     * Update the state of the input devices
     */
    static update(): void;
    /**
     * Check if a key is currently pressed down
     */
    static keyDown(code?: string): boolean;
    /**
     * Check if a key has been pressed since the last frame
     */
    static keyPressed(code?: string): boolean;
    /**
     * Check if a key has been released since the last frame
     */
    static keyReleased(code?: string): boolean;
    /**
     * Check if a mouse button is currently pressed down
     */
    static mouseDown(button?: InputManager.MouseButton): boolean;
    /**
     * Check if a mouse button has been pressed since the last frame
     */
    static mousePressed(button?: InputManager.MouseButton): boolean;
    /**
     * Check if a mouse button has been released since the last frame
     */
    static mouseReleased(button?: InputManager.MouseButton): boolean;
    /**
     * Check if the mousewheel is scrolling up
     */
    static mouseWheelUp(): boolean;
    /**
     * Check if the mousewheel is scrolling down
     */
    static mouseWheelDown(): boolean;
    /**
     * Get the current mouse position in screen-space
     */
    static get mousePosition(): vec2;
    /**
     * Get the currently hovered element
     */
    static get hoveredElement(): HTMLElement | null;
}
declare namespace InputManager {
    enum MouseButton {
        Left = 0,
        Middle = 1,
        Right = 2
    }
    type InputOptions = {
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
    type MouseState = {
        buttons: {
            [key in MouseButton]: boolean;
        };
        position: vec2;
        wheel: number;
        hoveredElement?: HTMLElement | null;
    };
    type KeyboardState = {
        [key: string]: boolean;
    };
}
export = InputManager;
