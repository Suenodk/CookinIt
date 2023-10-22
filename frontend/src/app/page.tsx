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
    <div>
      <nav className="flex justify-center py-4">
        <search>
          <form>
            <input
              type="search"
              placeholder="Your favorite food"
              className="bg-gray-200 p-2 border-2 hover:border-gray-400 focus:border-gray-400 outline-none w-96"
            />
          </form>
        </search>
      </nav>
      <main>
        <div></div>
      </main>
    </div>
  );
}
