"use client";

export const dynamic = "force-dynamic";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface AddIngredientModalRefProps {
  showModal: () => void;
}

interface AddIngredientModalProps {
  addIngredient: (ingredient: string) => void;
}
export const AddIngredientModal = forwardRef<AddIngredientModalRefProps, AddIngredientModalProps>(function AddIngredientModal(
  { addIngredient }: AddIngredientModalProps,
  ref
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [ingredientName, setIngredientName] = useState("");

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

  return (
    <dialog ref={dialogRef} className="p-4 rounded">
      <h1 className="text-lg font-medium mb-4">Add ingredient</h1>
      <div>
        <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Ingredient name</label>
        <input
          type="text"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          className="border-2 rounded p-2.5 outline-none"
          placeholder="1 tablespoon of sugar"
          maxLength={32}
          required
        />
      </div>
      <form method="dialog" className="justify-end gap-4 flex mt-4">
        <button>Cancel</button>
        <button className="text-orange-500" onClick={(e) => addIngredient(ingredientName)}>
          Add ingredient
        </button>
      </form>
    </dialog>
  );
});
