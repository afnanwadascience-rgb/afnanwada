import { notFound } from "next/navigation";

type ExperiencePageProps = {
  params: Promise<{
    experienceId: string;
  }>;
};

export default async function ExperiencePage({
  params,
}: ExperiencePageProps) {
  const { experienceId } = await params;

  if (!experienceId) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">
          Welcome to CreatorPilot AI
        </h1>

        <p className="mt-3 text-muted-foreground">
          Your CreatorPilot AI experience is ready.
        </p>

        <div className="mt-8 rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">
            Experience ID
          </p>

          <p className="mt-2 break-all font-mono text-sm">
            {experienceId}
          </p>
        </div>
      </div>
    </main>
  );
}