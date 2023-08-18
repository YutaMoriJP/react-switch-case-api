import * as React from "react";

const CASE_PROPS = {
  CONDITION: "condition"
} as const;

type CaseProps = React.PropsWithChildren<{ condition: boolean }>;
export const Case = ({ children }: CaseProps) => <>{children}</>;

export const Default = ({ children }: React.PropsWithChildren) => <>{children}</>;

export const Switch = ({ children }: React.PropsWithChildren) => {
  let matchedCase: React.ReactNode = null;
  let defaultCase: React.ReactNode = null;

  React.Children.forEach(children, (Component) => {
    const isReactElement = React.isValidElement(Component);

    if (!matchedCase && isReactElement && Component.type === Case && Component.props[CASE_PROPS.CONDITION]) {
      matchedCase = Component;
    }

    if (!defaultCase && !matchedCase && isReactElement && Component.type === Default) {
      defaultCase = Component;
    }
  });

  return matchedCase ?? defaultCase ?? null;
};

Case.displayName = "Case";
Default.displayName = "Default";
