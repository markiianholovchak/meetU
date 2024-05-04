type ButtonVariant = "primary" | "outlined" | "unstyled";

type SelectItem<T> = {
    label: string;
    value: T;
    disabled?: boolean;
};
