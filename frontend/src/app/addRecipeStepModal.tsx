"use client";

export const dynamic = "force-dynamic";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface AddRecipeStepModalRefProps {
  showModal: () => void;
}

interface AddRecipeStepModalProps {
  addRecipeStep: (title: string, description: string) => void;
}

export const AddRecipeStepModal = forwardRef<AddRecipeStepModalRefProps, AddRecipeStepModalProps>(function AddRecipeStepModal(
  { addRecipeStep }: AddRecipeStepModalProps,
  ref
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      <h1 className="text-lg font-medium mb-4">Add step</h1>
      <div>
        <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Step title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 rounded p-2.5 outline-none"
          maxLength={32}
          required
        />
      </div>
      <div>
        <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Step description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 rounded p-2.5 outline-none"
          maxLength={128}
          required
        />
      </div>
      <form method="dialog" className="justify-end gap-4 flex mt-4">
        <button>Cancel</button>
        <button className="text-orange-500" onClick={(e) => addRecipeStep(title, description)}>
          Add step
        </button>
      </form>
    </dialog>
  );
});
