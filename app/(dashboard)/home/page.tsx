import Greeting from "@/components/Greeting";
import GreetingsSkeleton from "@/components/GreetingSkeleton";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const getData = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
  return { projects };
};

export default async function Page() {
  const { projects } = await getData();

  return (
    <div className="h-full overflow-y-auto pr-6 w-full  gap-4 px-10">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex items-center">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3  w-full">
          {projects.map((project) => {
            return (
              <div className="w-1/3 px-2 py-3" key={project.id}>
                <Link href={`/project/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              </div>
            );
          })}
          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
}
