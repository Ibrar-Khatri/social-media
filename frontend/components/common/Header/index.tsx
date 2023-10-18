"use client";
import { useCallback } from "react";
import Image from "next/image";
import CommonButton from "../Buttons";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleRoute = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return (
    <div className="w-full h-[60px] border-b bg-white sticky top-0 flex items-center px-4 justify-between">
      <Image
        src="/assets/icons/logo.png"
        alt="logo"
        width={128}
        height={100}
        className="cursor-pointer"
        onClick={() => handleRoute("/")}
      />

      <div className="flex gap-2">
        <CommonButton
          text={"Signup"}
          type="primary"
          onClick={() => handleRoute("/signup")}
        />
        <CommonButton text={"Login"} onClick={() => handleRoute("/")} />
      </div>
    </div>
  );
};

export default Header;
