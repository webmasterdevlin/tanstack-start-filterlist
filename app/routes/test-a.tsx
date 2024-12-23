import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test-a')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/test-a"!</div>
}
