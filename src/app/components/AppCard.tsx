import { ReactNode } from "react";

export function AppCard({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

AppCard.Header = function AppCardHeader({ children }: { children: ReactNode }) {
  return (
    <div>
      Header
      {children}
    </div>
  );
};

AppCard.Footer = function AppCardFooter({ children }: { children: ReactNode }) {
  return (
    <div>
      Footer
      {children}
    </div>
  );
};
