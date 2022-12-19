import React from "react";
import { useState } from "react";

import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

import { Checkbox } from "ui";
import { Size } from "ui";

export default {
  title: "Production/Checkbox",
  component: Checkbox,
  argTypes: {
    checked: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
    size: {
      description: "Sets the checkbox's size",
      table: {
        type: {
          summary: "sm | md | lg",
        },
        defaultValue: { summary: "md" },
      },
      options: ["sm", "md", "lg"],
      control: "inline-radio",
    },
    disabled: {
      description: "Disables the checkbox if true",
      table: {
        type: {
          summary: "true | false",
        },
        defaultValue: { summary: "false" },
      },
    },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStoryFn<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <Checkbox
      size={args.size}
      checked={checked}
      onChange={setChecked}
      disabled={args.disabled}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  size: Size.Medium,
  disabled: false,
};
