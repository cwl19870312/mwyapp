export interface ModalConfig {
    title?: string;
    text?: string;
    buttons?: Array<ModalButton>;
}
export interface ModalButton {
    text: string;
    callback?: (...args) => void;
    main?: boolean;
}