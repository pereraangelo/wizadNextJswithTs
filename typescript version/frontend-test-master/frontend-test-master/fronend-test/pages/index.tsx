import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/styles.module.scss";
import FormCard from "../components/FormCard";

import { Email, Confirmation, Name } from "../components/Forms";
import { useFormData } from "../context";

const Home: NextPage = () => {
  const { formStep } = useFormData();

  return (
    <div className={styles.container}>
      <Head>
        <title>Wizard</title>
      </Head>
      <FormCard currentStep={formStep}>
        {formStep >= 0 && <Name />}
        {formStep >= 1 && <Email />}
        {formStep >= 2 && <Confirmation />}
      </FormCard>
    </div>
  );
};

export default Home;
