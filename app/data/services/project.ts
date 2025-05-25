import { slow } from '@/utils/slow';
import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

export async function getProject() {
  console.log('getProject');

  await slow(500);

  const projects = await prisma.project.findMany({
    include: {
      teamMembers: true,
    },
  });

  const project = projects.map((proj) => {
    return {
      ...proj,
      teamMembers: proj.teamMembers.reduce(
        (acc, member) => {
          if (!acc[member.role]) {
            acc[member.role] = { count: 0, members: [] };
          }
          acc[member.role].count += 1;
          acc[member.role].members.push(member);
          return acc;
        },
        {} as Record<
          string,
          { count: number; members: typeof proj.teamMembers }
        >
      ),
    };
  });

  return project[0];
}
