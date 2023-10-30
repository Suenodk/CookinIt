"use client";

export const dynamic = "force-dynamic";
import { CreateRecipeDto } from "@suenodk/shared";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface CreateRecipeModalRefProps {
  showModal: () => void;
}

export const CreateRecipeModal = forwardRef<CreateRecipeModalRefProps>(function CreateRecipeModal(props, ref) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [recipeName, setRecipeName] = useState("");

  useImperativeHandle(
    ref,
    () => {
      return {
        showModal() {
          dialogRef.current?.showModal();
        },
      };
    },
    []
  );

  async function createRecipe(e: React.MouseEvent) {
    // If recipeName is empty or null we don't want to do anything
    if (!recipeName) {
      e.preventDefault();
      return;
    }

    const newRecipe = new CreateRecipeDto();
    newRecipe.title = recipeName;

    // Otherwise lets add the recipe to the database
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });

    if (!result.ok) {
      throw new Error("Failed to post recipe!");
    }
  }

  return (
    <dialog ref={dialogRef} className="p-4 rounded">
      <h1 className="text-lg font-medium mb-4">Create new recipe</h1>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe name</label>
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          className="border-2 rounded p-2.5 outline-none"
          placeholder="Pancakes"
          maxLength={32}
          required
        />
      </div>
      <form method="dialog" className="justify-end gap-4 flex mt-4">
        <button>Cancel</button>
        <button className="text-orange-500" onClick={(e) => createRecipe(e)}>
          Create
        </button>
      </form>
    </dialog>
  );
});
