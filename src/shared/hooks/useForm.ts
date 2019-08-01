import { useState, useEffect, ChangeEvent } from 'react';
import { MessageDescriptor } from 'react-intl';

// T === Values type

export type Error = MessageDescriptor;

const useForm = <T>(
  initialValues: T,
  callback: (values: T) => void,
  validate: (values: T) => Error[],
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Error[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (errors.length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    event.persist();
    // @ts-ignore for checked property
    const { type, checked, value } = event.target;
    const eventValue = type === 'checkbox' ? checked : value;

    setValues(newValues => ({
      ...newValues,
      [event.target.name]: eventValue,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    setValues, // manualy overide values
    values,
    errors,
  };
};

export default useForm;
