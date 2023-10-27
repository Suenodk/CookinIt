import { Recipe } from "@suenodk/shared";
import Image from "next/image";
import { Nav } from "./components/nav/nav";

export const dynamic = "force-dynamic";

async function getRecipes(): Promise<Recipe[]> {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`);

    if (!result.ok) {
      throw new Error("Failed to fetch recipes!");
    }

    return await result.json();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <>
      <Nav />
      <main>
        {recipes.map((r) => (
          <div key={r.title}>{JSON.stringify(r)}</div>
        ))}

        <div className="mx-4 h-40 cursor-pointer relative">
          {/* <Image className="rounded" layout="fill" src={pancakes.src} alt="pancakes" objectFit="cover" /> */}
        </div>
      </main>
    </>
  );
}
