import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
return (
      <div>
      <h1 className='text-4xl'>About page</h1>
    </div>
)
}
