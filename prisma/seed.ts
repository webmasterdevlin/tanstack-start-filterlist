import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PROJECTS = [
  {
    companyName: 'Company X',
    deliverables: 'Web app;PWA;Documentation',
    expectedLaunchDate: new Date('2025-01-01T00:00:00Z'),
    id: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    name: 'Project X',
    startDate: new Date('2024-06-01T00:00:00Z'),
  },
];

const TEAMMEMBERS = [
  {
    id: '90bfe743-b2e6-456d-b9bf-e0c01ec4dd36',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    role: 'backend',
  },
  {
    id: '3077c0b5-e028-4add-b098-7b109fbf6248',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    role: 'backend',
  },
  {
    id: '09557e52-05e8-4b43-ada7-e30898b3c827',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    role: 'frontend',
  },
  {
    id: '204e65bf-7eba-47d1-9c71-c35cde4c493b',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    role: 'test-manager',
  },
  {
    id: '786b7ba7-3045-4ae0-a6b7-cbce8b15770d',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    role: 'ux-designer',
  },
];

const CATEGORIES = [
  {
    id: 0,
    name: 'Infrastructure',
  },
  {
    id: 1,
    name: 'Frontend',
  },
  {
    id: 2,
    name: 'Backend',
  },
  {
    id: 3,
    name: 'Testing',
  },
  {
    id: 4,
    name: 'Design',
  },
];

const TODOS = [
  {
    categoryId: 0,
    createdAt: new Date('2024-09-03T00:00:00Z'),
    description: 'Implement a CI/CD pipeline for the application',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    status: 'done',
    title: 'Implement CI/CD',
  },
  {
    categoryId: 4,
    createdAt: new Date('2024-05-03T00:00:00Z'),
    description: 'Design the homepage of the application in Figma',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    status: 'inprogress',
    title: 'Design the homepage',
  },
  {
    categoryId: 4,
    createdAt: new Date('2024-06-03T00:00:00Z'),
    description: 'Research user personas for the application to get a better understanding of the target audience',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    status: 'done',
    title: 'Research user personas',
  },
  {
    categoryId: 1,
    createdAt: new Date('2024-07-03T00:00:00Z'),
    description: 'Implement the homescreen of the application when the Figma design is available',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    status: 'todo',
    title: 'Implement the homescreen',
  },
  {
    categoryId: 1,
    createdAt: new Date('2024-07-03T00:00:00Z'),
    description: 'Set up the application structure using Next.js',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    status: 'inprogress',
    title: 'Set up application structure',
  },
  {
    categoryId: 1,
    createdAt: new Date('2024-07-03T00:00:00Z'),
    description: 'Enable PWA support for the application so it can be installed on mobile devices',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    status: 'todo',
    title: 'Enable PWA support',
  },
  {
    categoryId: 2,
    createdAt: new Date('2024-07-03T00:00:00Z'),
    description: 'Implement the API for the application using ASP.NET Core',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    status: 'inprogress',
    title: 'Implement the API',
  },
  {
    categoryId: 2,
    createdAt: new Date('2024-09-03T00:00:00Z'),
    description: 'Write the documentation for the API endpoints',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    status: 'todo',
    title: 'Write API documentation',
  },
  {
    categoryId: 2,
    createdAt: new Date('2024-05-03T00:00:00Z'),
    description:
      'Create the database schema for the application, use entity-relationship diagrams to model the database schema',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    status: 'inprogress',
    title: 'Create database schema',
  },
  {
    categoryId: 3,
    createdAt: new Date('2024-09-03T00:00:00Z'),
    description: 'Test the homescreen of the application',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    status: 'todo',
    title: 'Test the homescreen',
  },
];

async function seedTodos() {
  await Promise.all(
    PROJECTS.map(project => {
      return prisma.project.create({
        data: {
          companyName: project.companyName,
          deliverables: project.deliverables,
          expectedLaunchDate: project.expectedLaunchDate,
          id: project.id,
          name: project.name,
          startDate: project.startDate,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully create project records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create project records', e);
    });
  await Promise.all(
    TEAMMEMBERS.map(member => {
      return prisma.teamMember.create({
        data: {
          id: member.id,
          projectId: member.projectId,
          role: member.role,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully create teamMember records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create teamMember records', e);
    });
  await Promise.all(
    CATEGORIES.map(category => {
      return prisma.category.create({
        data: {
          id: category.id,
          name: category.name,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully create category records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create category records', e);
    });
  await Promise.all(
    TODOS.map(task => {
      return prisma.task.create({
        data: {
          categoryId: task.categoryId,
          createdAt: task.createdAt,
          description: task.description,
          projectId: task.projectId,
          status: task.status,
          title: task.title,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully created task records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create task records', e);
    });
}

seedTodos();
