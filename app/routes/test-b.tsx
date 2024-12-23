import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test-b')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/test-b"!</div>
}
