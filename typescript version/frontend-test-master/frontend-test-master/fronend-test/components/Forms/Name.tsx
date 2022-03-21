import styles from "../../styles/styles.module.scss";
import { useFormData } from "../../context";
import { MouseEvent, useState } from "react";

type Error = {
  efirstName: string | null;
  elastName: string | null;
};

const defaultError: Error = {
  efirstName: null,
  elastName: null,
};

export default function Name(): JSX.Element {
  const { data, formStep, nextFormStep, setFormValues } =
    useFormData();

  const [error, setError] = useState(defaultError);

  //validaty check function
  const checkValidate = <P extends keyof Error>(props: P, value: Error[P]) => {
    if (value != null) {
      if (value.length === 0) {
        setError((prevValues) => ({
          ...prevValues,
          [props]: "This field is required.",
        }));
      } else if (value.length == 1) {
        setError((prevValues) => ({
          ...prevValues,
          [props]: "Minimum 2 characters are required.",
        }));
      } else {
        setError((prevValues) => ({
          ...prevValues,
          [props]: "",
        }));
      }
    }
  };

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (nextFormStep) nextFormStep();
  };
  return (
    <div className={formStep === 0 ? styles.showForm : styles.hideForm}>
      <form id="wizadForm">
        <div className={styles.formHeader}>Name</div>
        <div className={styles.formRow}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            value={data.firstName || ""}
            onChange={(e) => {
              if (setFormValues) setFormValues(e);
              checkValidate("efirstName", e.target.value);
            }}
            className={error.efirstName! && styles.errorInput}
          />
          {error.efirstName && (
            <span className={styles.error}>{error.efirstName}</span>
          )}
        </div>
        <div className={styles.formRow}>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={data.lastName || ""}
            onChange={(e) => {
              if (setFormValues) setFormValues(e);
              checkValidate("elastName", e.target.value);
            }}
            className={error.elastName! && styles.errorInput}
          />
          {error.elastName && (
            <span className={styles.error}>{error.elastName}</span>
          )}
        </div>

        <div className={styles.buttonSection}>
          <button
            onClick={handleOnClick}
            disabled={
              error.efirstName === "" && error.elastName === "" ? false : true
            }
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
