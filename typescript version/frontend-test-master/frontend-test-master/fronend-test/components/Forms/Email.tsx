import styles from "../../styles/styles.module.scss";
import { useFormData } from "../../context";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

type Error = {
  eEmail: string | null;
  eConfirmEmail: string | null;
};

const defaultError: Error = {
  eEmail: null,
  eConfirmEmail: null,
};

export default function Email(): JSX.Element {
  const { data, formStep, nextFormStep, prevFormStep, setFormValues } =
    useFormData();

  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState(defaultError);

  //validity check function
  const checkValidate = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;

    if (value != null) {
      //incase user change the email after filling reset the confirm email field
      setConfirmEmail("");
      setError((prevValues) => ({
        ...prevValues,
        eConfirmEmail: null,
      }));

      //check if the provide email address is a valid emial address
      let regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      let isEmail = regexp.test(value);

      if (value === "") {
        setError((prevValues) => ({
          ...prevValues,
          eEmail: "This field is required.",
        }));
      } else if (!isEmail) {
        setError((prevValues) => ({
          ...prevValues,
          eEmail: "Please enter a valid email address.",
        }));
      } else {
        setError((prevValues) => ({
          ...prevValues,
          eEmail: "",
        }));
      }
    }
  };

  //email confirm function
  const isExactEmail = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (value) {
      if (value.length === 0) {
        setError((prevValues) => ({
          ...prevValues,
          eConfirmEmail: "This field is required",
        }));
      }

      if (data.email !== value) {
        setError((prevValues) => ({
          ...prevValues,
          eConfirmEmail: "Your emails dont match",
        }));
        // e.target.name.focus();
      } else {
        setError((prevValues) => ({
          ...prevValues,
          eConfirmEmail: "",
        }));
      }
    }
  };

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (nextFormStep) nextFormStep();
  };

  useEffect(() => {
    if (data) {
      setError((prevValues) => ({
        ...prevValues,
        eEmail: "",
      }));
    }
  }, []);

  return (
    <div className={formStep === 1 ? styles.showForm : styles.hideForm}>
      <form>
        <div className={styles.formHeader}>Email</div>
        <div className={styles.formRow}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={data.email || ""}
            onChange={(e) => {
              if (setFormValues) setFormValues(e);
              checkValidate(e);
            }}
            className={error.eEmail! && styles.errorInput}
          />
          {error.eEmail && <span className={styles.error}>{error.eEmail}</span>}
        </div>
        <div className={styles.formRow}>
          <input
            type="text"
            name="confirmEmail"
            id="confirmEmail"
            placeholder="Retype Email"
            value={confirmEmail || ""}
            onChange={(e) => {
              if (setConfirmEmail) setConfirmEmail(e.target.value);
              isExactEmail(e);
            }}
            className={error.eConfirmEmail! && styles.errorInput}
          />
          {error.eConfirmEmail && (
            <span className={styles.error}>{error.eConfirmEmail}</span>
          )}
        </div>
        <div className={styles.buttonSection}>
          <button
            onClick={handleOnClick}
            disabled={
              error.eEmail === "" && error.eConfirmEmail === "" ? false : true
            }
          >
            Next
          </button>

          <button type="button" onClick={prevFormStep} className={styles.back}>
            back
          </button>
        </div>
      </form>
    </div>
  );
}
