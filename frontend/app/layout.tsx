import StyledComponentsRegistry from "@/lib/AntdRegistry";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";
import Header from "@/components/common/Header";
import { Suspense } from "react";
import Loading from "./loading";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Friends Flow",
  description: "Connect with your friends",
  icons: "/assets/icons/title-bar-logo.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          <StyledComponentsRegistry>
            <ConfigProvider>
              <div className="h-screen overscroll-y-auto">
                <Header />
                <div className="pt-[70px] min-h-[calc(100vh-60px)] h-full bg-slate-100">
                  <div className="h-full  max-w-screen-xlg mx-auto px-[10px]">
                    {children}
                  </div>
                </div>
              </div>
            </ConfigProvider>
          </StyledComponentsRegistry>
        </Suspense>
      </body>
    </html>
  );
}
