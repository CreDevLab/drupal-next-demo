import Link from "next/link"
import { DrupalMenuLinkContent } from "next-drupal"
import { PreviewAlert } from "components/preview-alert"
import { Footer } from "components/footer"

export interface LayoutProps {
  menus: {
    blog: DrupalMenuLinkContent[]
    footer: DrupalMenuLinkContent[]
  }
  children?: React.ReactNode
}
export function Layout({ menus, children }: LayoutProps) {
  return (
    <>
      <PreviewAlert />
      <div className="max-w-screen-md px-6 mx-auto">
        <header>
          <div className="container flex items-center justify-between py-6 mx-auto">
            <Link href="/" passHref>
              <a className="text-2xl font-semibold no-underline">
                Drupal + Next.js
              </a>
            </Link>
            <Link href="https://next-drupal.org/docs" passHref>
              <a target="_blank" rel="external" className="hover:text-blue-600">
                Read the docs
              </a>
            </Link>
          </div>
        </header>
        <main className="container py-10 mx-auto">{children}</main>
        <Footer links={menus.footer} />
      </div>
    </>
  )
}
