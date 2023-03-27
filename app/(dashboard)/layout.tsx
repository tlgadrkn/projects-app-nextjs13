import "@/styles/global.css";
import GlassPane from "@/components/GlassPane";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function DashboardRootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
