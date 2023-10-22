import { RecipeDto } from "./dto/RecipeDto";

async function getData(): Promise<RecipeDto> {
  const result = await fetch("http://localhost:8080/recipes");

  if (!result.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return await result.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.name}
      <div>Recipe 1</div>
      <div>Recipe 2</div>
      <div>Recipe 3</div>
    </main>
  );
}
