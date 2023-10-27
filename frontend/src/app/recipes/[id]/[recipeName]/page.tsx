"use client";

import { Nav } from "@/app/components/nav/nav";
import { Recipe as RecipeModel } from "@suenodk/shared";
import Image from "next/image";
import { useEffect, useState } from "react";
import Ingredients from "./ingredients";
import Instructions from "./instructions";
import Tabs from "./tabs";

export default function Recipe({ params }: { params: { id: number; recipeName: string } }) {
  const [activeTab, setActiveTab] = useState("ingredients");
  const [recipe, setRecipe] = useState<RecipeModel>();

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
  return (
    <>
      <Nav />
      <main>
        <div className="h-40 relative">
          {recipe && <Image className="rounded object-cover w-full" fill src={recipe.thumbnailUrl} alt="pancakes" />}
        </div>
        <div>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {recipe && activeTab === "ingredients" && <Ingredients ingredients={recipe.ingredientsForRecipes} />}
          {recipe && activeTab === "instructions" && <Instructions steps={recipe.recipeSteps} />}
        </div>
      </main>
    </>
  );
}
