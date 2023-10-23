import { Recipe } from "@suenodk/shared";
import Image from "next/image";
import logo from "./logo.png";

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
    <div>
      <nav className="flex justify-space-between py-4">
        <Image className="w-16" src={logo} alt="orange fox smiling with spatula" />
        <search>
          <form>
            <input
              type="search"
              placeholder="Your favorite food"
              className="bg-gray-200 p-2 border-2 hover:border-gray-400 focus:border-gray-400 outline-none w-96"
            />
          </form>
        </search>
        <button className="bg-orange-500 text-gray-50">Create recipe</button>
      </nav>
      <main>
        <div></div>
      </main>
    </div>
  );
}
