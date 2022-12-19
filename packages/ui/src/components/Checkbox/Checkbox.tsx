import React from "react";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import type { Size } from "../../types";

import classNames from "classnames";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  size: Size;
  disabled?: boolean;
  checked: boolean;
  onChange?: (update: boolean) => void;
  className?: string;
}

const Checkbox = (props: CheckboxProps) => (
  <RadixCheckbox.Root
    className={classNames(props.className, styles.checkboxRoot)}
    disabled={props.disabled}
    checked={props.checked}
    onCheckedChange={props.onChange}
  >
    <RadixCheckbox.Indicator className={classNames(styles.checkboxIndicator)}>
      <CheckIcon />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
);

export default Checkbox;
export type { CheckboxProps };
