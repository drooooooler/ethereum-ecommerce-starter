"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-1 flex justify-between bg-background p-[20px] md:p-[30px]">
        <button className="font-bold" onClick={() => window.ElliotWallet.open()}>
          WALLET
        </button>
        <Link className="font-bold" href="/about">
          ABOUT
        </Link>
      </header>
    </>
  );
}
