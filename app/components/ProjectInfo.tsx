import { use, type ReactNode } from 'react';
import Skeleton from './ui/Skeleton';
import { useLoaderData } from '@tanstack/react-router';

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="w-fit bg-black px-2 py-1 uppercase text-white dark:bg-white dark:text-black">
      {children}
    </span>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span>{label}</span>
      <Chip>{value}</Chip>
    </div>
  );
}

export default function ProjectInfo() {
  const { projectPromise } = useLoaderData({ from: '__root__' });
  const project = use(projectPromise);

  return (
    <div className="flex gap-16">
      <div className="flex flex-col gap-2">
        <span className="font-bold">About the project</span>
        <Info label="Project name:" value={project.name} />
        <Info label="Company:" value={project.companyName} />
        <Info
          label="Duration:"
          value={`${new Date(project.startDate).getFullYear()}-${new Date(project.expectedLaunchDate).getFullYear()}`}
        />
        <Info
          label="Expected launch:"
          value={new Date(project.expectedLaunchDate).toLocaleDateString()}
        />
      </div>
      <div className="hidden flex-col gap-2 sm:flex">
        <span className="font-bold">Team members</span>
        {Object.entries(project.teamMembers).map(([role, member]) => {
          return (
            <Chip
              key={role}
            >{`${role.split('-').join(' ')} (${member.count})`}</Chip>
          );
        })}
      </div>
      <div className="hidden flex-col gap-2 md:flex">
        <span className="font-bold">Deliverables</span>
        {project.deliverables.split(';').map((deliverable) => {
          return (
            <span
              key={deliverable}
              className="w-fit bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
            >
              {deliverable}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectInfoSkeleton() {
  return <Skeleton className="mb-[84px] w-1/2" />;
}
