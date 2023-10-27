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
        <div className="mx-4 h-40 cursor-pointer relative">
          {recipes.map((r) => (
            <a key={r.id} className="contents relative" href={`/recipes/${r.id}/${r.title}`}>
              <Image className="rounded object-cover w-full" fill src={r.thumbnailUrl} alt={r.title} />
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
