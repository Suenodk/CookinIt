"use client";

import { CreateRecipeModalRefProps } from "@/app/createRecipeModal";
import Image from "next/image";
import { useRef } from "react";
import logo from "../../logo.png";

export function Nav() {
  const createRecipeModalRef = useRef<CreateRecipeModalRefProps>(null);

  return (
    <>
      <nav className="flex justify-between gap-4 md:gap-0 px-4 md:p-0 py-4 w-screen md:w-[1024px] self-center items-center">
        <Image className="w-12 md:w-16" src={logo} alt="orange fox smiling with spatula" />
        <search className="contents">
          <form className="contents">
            <input
              type="search"
              placeholder="Your favorite food"
              className="bg-gray-200 p-2 border-2 hover:border-gray-400 focus:border-gray-400 outline-none w-full md:w-96"
            />
          </form>
        </search>
        {/* <button onClick={() => createRecipeModalRef.current?.showModal()} className="bg-orange-500 text-gray-50 h-12 px-4 rounded">
          Create recipe
        </button> */}
      </nav>
      {/* <CreateRecipeModal ref={createRecipeModalRef} /> */}
    </>
  );
}
