import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$tab/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello /$tab/!</div>
}
