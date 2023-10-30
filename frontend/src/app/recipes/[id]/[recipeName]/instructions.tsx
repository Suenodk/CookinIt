import { RecipeStep } from "@suenodk/shared/dist/models/RecipeStep";

interface InstructionsProps {
  steps: RecipeStep[];
}

export default function Instructions({ steps }: InstructionsProps) {
  return (
    <>
      <h2 className="hidden">Instructions</h2>
      <ol className="mb-4 mx-4">
        {steps.map((step, index) => (
          <li key={step.id ?? index}>
            <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
            <p className="text-justify">{step.description}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
