type FormErrorFieldProps = {
    error: string;
};
export const FormErrorField = ({ error }: FormErrorFieldProps) => {
    return <p className="text-sm text-crimson">*{error}</p>;
};
