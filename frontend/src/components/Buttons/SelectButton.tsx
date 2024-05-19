import React, { Children } from "react";
import styles from "../../styles/modules/button.module.css";
import { getClasses } from "../../utils/getClasses";

function SelectButton({
    children,
    id,
    ...rest
  }: {
    children: any;
    id?: string;
  }) {
    return (
      <select
        className={getClasses([styles.button, styles.button__select])}
        {...rest}
      >
        {children}
      </select>
    );
  }
  export default SelectButton;