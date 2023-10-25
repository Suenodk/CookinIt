"use client";

export const dynamic = "force-dynamic";
import { Recipe } from "@suenodk/shared";
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

    const newRecipe = new Recipe();
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
    <dialog ref={dialogRef}>
      <h1>Create new recipe</h1>
      <input value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="Recipe name" />
      <form method="dialog">
        <button>Cancel</button>
        <button onClick={(e) => createRecipe(e)}>Create</button>
      </form>
    </dialog>
  );
});
