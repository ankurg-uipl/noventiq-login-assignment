import {useCallback, useState} from "react";

/**
 * @param options
 * @returns {{handleBlur: handleBlur, handleSubmit: handleSubmit, data: ({password: string, email: string}|{}), handleChange: (function(*, *): function(*): void), errors: {}}}
 */
export function useFormHook(options){
    const [data, setData] = useState((options?.initialValues || {}));
    const [errors, setErrors] = useState({});

    /**
     * wrapping reset form function into useCallback hook to avoid recreation of it
     */
    const resetForm = useCallback(()=>{
        setData(d=> {
            console.log('d', d)
            for (const argumentsKey in d) {
                d[argumentsKey] = '';
            }
            return {...d};
        });
    }, [])

    const handleChange = (key, sanitizeFn) => (
        e,
    ) => {
        const targetValue = (e.target.type === "checkbox") ? e.target.checked : e.target.value;
        const value = sanitizeFn ? sanitizeFn(targetValue) : targetValue;
        setData({
            ...data,
            [key ? key : e.target.name]: value,
        });
    };

    const handleBlur = (e) => {
        const targetValue = (e.target.type === "checkbox") ? e.target.checked : e.target.value;
        const error = options.validations[e.target.name] ? options.validations[e.target.name](targetValue) : '';
        setErrors({
            ...errors,
            [e.target.name]: error,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validations = options?.validations;
        if (validations) {
            let valid = true;
            const newErrors = {};
            for (const key in data) {
                const error = options.validations[key] ? options.validations[key](data[key]) : '';
                newErrors[key] = error;
                if (error) {
                    valid = false;
                }
            }
            if (!valid) {
                setErrors(newErrors);
                return;
            }
        }

        setErrors({});

        if (options?.onSubmit) {
            options.onSubmit();
        }
    };

    return {
        data,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm
    };
};
