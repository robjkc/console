import { BreadcrumbFeature } from '../../feature/breadcrumb/breadcrumb'

export function TopBar() {
  return (
    <div className="sticky top-0 left-16 z-20 border-l border-b w-full h-navbar-height dark:border-neutral-500 dark:bg-neutral-650 border-neutral-200 bg-white">
      <div className="flex px-5 justify-between items-center h-full">
        <BreadcrumbFeature />
      </div>
    </div>
  )
}

export default TopBar
