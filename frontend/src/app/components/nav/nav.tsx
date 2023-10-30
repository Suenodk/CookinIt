"use client";

import { CreateRecipeModal, CreateRecipeModalRefProps } from "@/app/createRecipeModal";
import Image from "next/image";
import { useRef } from "react";
import logo from "../../logo.png";

export interface NavProps {
  showActions?: boolean;
}

export function Nav({showActions = true}: NavProps) {
  const createRecipeModalRef = useRef<CreateRecipeModalRefProps>(null);

  return (
    <>
      <nav className="flex items-center justify-between gap-4 md:gap-0 px-4 md:p-0 py-2 w-screen md:w-[1024px] self-center">
        <a href="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-orange-500">
          <Image className="w-10 md:w-16" src={logo} alt="orange fox smiling with spatula" />
          <span>CookinIt</span>
        </a>

        {showActions && (
          <button onClick={() => createRecipeModalRef.current?.showModal()} className="bg-orange-500 rounded px-1 h-8">
          <svg className="w-8 h-8 text-white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
          </svg>
        </button>
        )}
        {/* <search className="contents">
          <form className="contents">
            <input
              type="search"
              placeholder="Your favorite food"
              className="bg-gray-200 p-2 border-2 hover:border-gray-400 focus:border-gray-400 outline-none w-full md:w-96"
            />
          </form>
        </search> */}
        {/* <button onClick={() => createRecipeModalRef.current?.showModal()} className="bg-orange-500 text-gray-50 h-12 px-4 rounded">
          Create recipe
        </button> */}
      </nav>
      <CreateRecipeModal ref={createRecipeModalRef} />
    </>
  );
}
