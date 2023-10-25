import { Recipe } from "@suenodk/shared";
import { Nav } from "./components/nav/nav";

export const dynamic = "force-dynamic";

async function getData(): Promise<Recipe> {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`);

  if (!result.ok) {
    throw new Error("Failed to fetch recipes!");
  }

  return await result.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Nav />
      <main>
        <div>{JSON.stringify(data)}</div>
      </main>
    </>
  );
}
