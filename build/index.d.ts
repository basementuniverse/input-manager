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
export declare enum MouseButton {
    Left = 0,
    Middle = 1,
    Right = 2
}
export type MouseState = {
    buttons: {
        [key in MouseButton]: boolean;
    };
    position: vec;
    wheel: number;
    hoveredElement?: HTMLElement | null;
};
export type KeyboardState = {
    [key: string]: boolean;
};
export default class InputManager {
    private static instance;
    private static readonly defaultOptions;
    private options;
    private keyboardState;
    private previousKeyboardState;
    private mouseState;
    private previousMouseState;
    private constructor();
    /**
     * Initialise the input manager for managing mouse and keyboard input
     */
    static initialise(options?: Partial<InputOptions>): void;
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
    static mouseDown(button?: MouseButton): boolean;
    /**
     * Check if a mouse button has been pressed since the last frame
     */
    static mousePressed(button?: MouseButton): boolean;
    /**
     * Check if a mouse button has been released since the last frame
     */
    static mouseReleased(button?: MouseButton): boolean;
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
    static get mousePosition(): vec;
    /**
     * Get the currently hovered element
     */
    static get hoveredElement(): HTMLElement | null;
}
