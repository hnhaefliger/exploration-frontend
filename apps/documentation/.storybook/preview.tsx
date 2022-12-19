import React from "react";

import { ColorScheme } from "ui";

import classnames from "classnames";
import styles from "./preview.module.css";

enum ColorSchemeViews {
  SideBySide = "side-by-side",
  Light = "light",
  Dark = "dark",
}

const ColorSchemeTypes = {
  colorScheme: {
    name: "Color scheme",
    description: "Switch colorScheme",
    defaultValue: ColorSchemeViews.SideBySide,
    toolbar: {
      icon: "photo",
      items: [
        { value: ColorScheme.Light, icon: "circlehollow", title: "light" },
        { value: ColorScheme.Dark, icon: "circle", title: "dark" },
        {
          value: ColorSchemeViews.SideBySide,
          icon: "sidebar",
          title: "side by side",
        },
      ],
      showName: true,
    },
  },
};

interface ColorSchemeBlockProps {
  colorScheme: ColorScheme;
  children: React.ReactNode;
}

const ColorSchemeBlock = (props: ColorSchemeBlockProps) => {
  return (
    <div
      data-color-scheme={props.colorScheme}
      className={classnames(styles.colorSchemeBlock)}
    >
      {props.children}
    </div>
  );
};

enum ViewMode {
  Docs = "docs",
  Story = "story",
}

interface ColorSchemeContext {
  globals: {
    colorScheme: ColorSchemeViews;
  };
  viewMode: ViewMode;
  args: {
    docsPreviewHeight?: number;
  };
}

const WithColorScheme = (Story, context: ColorSchemeContext) => {
  const { globals, viewMode, args } = context;
  const { colorScheme } = globals;

  const containerStyle =
    viewMode === ViewMode.Docs && args?.docsPreviewHeight
      ? { height: args.docsPreviewHeight }
      : {};
  return (
    <div
      className={classnames(styles.colorSchemeBlockContainer)}
      style={containerStyle}
    >
      {colorScheme === ColorSchemeViews.SideBySide ? (
        <React.Fragment>
          <ColorSchemeBlock colorScheme={ColorScheme.Light}>
            <Story
              {...context}
              args={{ colorScheme: ColorScheme.Light, ...args }}
            />
          </ColorSchemeBlock>
          <ColorSchemeBlock colorScheme={ColorScheme.Dark}>
            <Story
              {...context}
              args={{ colorScheme: ColorScheme.Dark, ...args }}
            />
          </ColorSchemeBlock>
        </React.Fragment>
      ) : (
        <ColorSchemeBlock
          colorScheme={
            colorScheme === ColorSchemeViews.Light
              ? ColorScheme.Light
              : ColorScheme.Dark
          }
        >
          <Story {...context} />
        </ColorSchemeBlock>
      )}
    </div>
  );
};

export const globalTypes = ColorSchemeTypes;
export const decorators = [WithColorScheme];
export const parameters = {
  viewMode: ViewMode.Docs,
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      date: /Date$/,
    },
  },
  backgrounds: { disable: true, grid: { disable: true } },
  viewport: { disable: true },
};
