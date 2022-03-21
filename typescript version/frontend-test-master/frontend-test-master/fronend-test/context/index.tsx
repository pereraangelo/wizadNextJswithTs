import { ChangeEvent, createContext, FC, useContext, useState } from "react";

interface IFormcontext {
  data: { firstName: string; lastName: string; email: string };
  formStep: number;
  setFormValues?: (e: ChangeEvent<HTMLInputElement>) => void;
  nextFormStep?: () => void;
  prevFormStep?: () => void;
}

const defaultState = {
  data: { firstName: "", lastName: "", email: "" },
  formStep: 0,
};

const FormContext = createContext<IFormcontext>(defaultState);

export default FormContext;

export const FormProvider: FC = ({ children }) => {
  const [data, setData] = useState(defaultState.data);
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => {
    setFormStep((currentStep: number) => currentStep + 1);
  };

  const prevFormStep = () =>
    setFormStep((currentStep: number) => currentStep - 1);

  const setFormValues = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <FormContext.Provider
      value={{ data, formStep, nextFormStep, prevFormStep, setFormValues }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);
