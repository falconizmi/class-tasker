// import React, { Children } from "react";
// import styles from "../../styles/modules/button.module.css";
// import { getClasses } from "../../utils/getClasses";

// const buttonTypes: { [key: string]: string } = {
//   primary: "primary",
//   seconadry: "secondary",
// };

// function Button({
//   children,
//   type = "button",
//   variant = "primary",
//   ...rest
// }: {
//   children: any;
//   type?: string;
//   variant?: string;
//   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
// }) {
//   return (
//     <button
//       className={getClasses([
//         styles.button,
//         styles[`button--${buttonTypes[variant]}`],
//       ])}
//       type={type === "submit" ? "submit" : "button"}
//       {...rest}
//     >
//       {children}
//     </button>
//   );
// }

// export default Button;
