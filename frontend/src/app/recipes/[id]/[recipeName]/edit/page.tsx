"use client";

import { AddIngredientModal, AddIngredientModalRefProps } from "@/app/addIngredientModal";
import { AddRecipeStepModal, AddRecipeStepModalRefProps } from "@/app/addRecipeStepModal";
import { Nav } from "@/app/components/nav/nav";
import { Ingredient, Recipe, RecipeStep } from "@suenodk/shared";
import { useEffect, useRef, useState } from "react";
import Ingredients from "../ingredients";
import Instructions from "../instructions";
import Tabs from "../tabs";

export default function EditRecipe({ params }: { params: { id: number; recipeName: string } }) {
  const [activeTab, setActiveTab] = useState("ingredients");
  const [recipe, setRecipe] = useState<Recipe>();
  const [savingRecipe, setSavingRecipe] = useState<boolean>();
  const addIngredientModalRef = useRef<AddIngredientModalRefProps>(null);
  const AddRecipeStepModalRef = useRef<AddRecipeStepModalRefProps>(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${params.id}`);

        setRecipe(await result.json());

        if (!result.ok) {
          throw new Error("Failed to fetch recipe!");
        }
      } catch (error) {
        throw new Error("Failed to fetch recipe!");
      }
    };

    getRecipe();
  }, [params.id]);

  function updateVisiblity(event: any) {
    if (!recipe) return;

    // only if the recipe exists we want to update it
    setRecipe({ ...recipe, public: event.target.value === "public" });
  }

  function addIngredient(ingredientName: string) {
    if (!recipe) return;

    const ingredient = new Ingredient();
    ingredient.name = ingredientName;

    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] });
  }

  function addRecipeStep(title: string, description: string) {
    if (!recipe) return;

    const recipeStep = new RecipeStep();
    recipeStep.title = title;
    recipeStep.description = description;

    setRecipe({ ...recipe, recipeSteps: [...recipe.recipeSteps, recipeStep] });
  }

  async function saveRecipe() {
    if (!recipe || savingRecipe) return;

    setSavingRecipe(true);

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${recipe.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });

    setSavingRecipe(false);
  }

  if (!recipe) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Nav showActions={false} />
        <main className="flex flex-col gap-4">
          <div className="mx-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">Recipe name</label>
            <input
              type="text"
              value={recipe.title}
              onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
              className="border-2 rounded p-2.5 outline-none w-full"
              maxLength={32}
              required
            />
          </div>
          <div className="flex mx-4 gap-2" onChange={(e) => updateVisiblity(e)}>
            <input className="accent-orange-600" type="radio" id="public" name="visibility" defaultChecked={recipe.public} value="public" />
            <label htmlFor="public">Public</label>
            <input className="accent-orange-600 ml-4" type="radio" id="private" name="visibility" defaultChecked={!recipe.public} value="private" />
            <label htmlFor="private">Private</label>
          </div>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <button
            onClick={() => (activeTab === "ingredients" ? addIngredientModalRef.current?.showModal() : AddRecipeStepModalRef.current?.showModal())}
            className="bg-orange-500 text-white h-10 w-full rounded-t"
          >
            {activeTab === "ingredients" ? "Add ingredient" : "Add step"}
          </button>
          {recipe.ingredients && activeTab === "ingredients" && <Ingredients ingredients={recipe.ingredients} />}
          {recipe.recipeSteps && activeTab === "instructions" && <Instructions steps={recipe.recipeSteps} />}
          <button disabled={savingRecipe} onClick={() => saveRecipe()} className="bg-orange-500 text-white fixed bottom-0 h-10 w-full rounded-t">
            Save
          </button>
        </main>
        <AddIngredientModal addIngredient={addIngredient} ref={addIngredientModalRef} />
        <AddRecipeStepModal addRecipeStep={addRecipeStep} ref={AddRecipeStepModalRef} />
      </>
    );
  }
}
