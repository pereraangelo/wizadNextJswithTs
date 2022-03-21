import React from "react";
import styles from "../styles/styles.module.scss";

type Props = {
  currentStep: number;
};

export const FormCard: React.FC<Props> = ({ children, currentStep }) => {
  return (
    <div className={styles.formCard}>
      <div className={styles.formHeader}>
        <h1>Wizard</h1>
      </div>
      <div className={styles.subHeadings}>
        <label className={styles.step}>
          <span
            className={`${
              currentStep >= 0 ? styles.stepNoSuccess : styles.stepNo
            }`}
          >
            1
          </span>
          Name
        </label>
        <label className={styles.step}>
          <span
            className={`${
              currentStep >= 1 ? styles.stepNoSuccess : styles.stepNo
            }`}
          >
            2
          </span>
          Email
        </label>
        <label>
          <label className={styles.step}>
            <span
              className={`${
                currentStep >= 2 ? styles.stepNoSuccess : styles.stepNo
              }`}
            >
              3
            </span>
            Confirmation
          </label>
        </label>
      </div>

      {children}
    </div>
  );
};

export default FormCard;
