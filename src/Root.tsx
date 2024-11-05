import type { PropsWithChildren } from "react"

const Root = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <h1 className="text-2xl font-bold text-gray-900">Resto App</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto flex max-w-7xl flex-1 flex-col px-4 py-6">
          {children}
        </div>
      </main>
      <footer className="mt-auto bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Resto App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Root
