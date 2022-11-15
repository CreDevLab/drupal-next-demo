import Link from "next/link"
import { DrupalNode } from "next-drupal"
import { MediaImage } from "components/media--image"
import { absoluteUrl, formatDate } from "lib/utils"

interface NodeArticleTeaserProps {
  node: DrupalNode
}

export function NodeArticleTeaser({ node, ...props }: NodeArticleTeaserProps) {
  return (
    <article {...props}>
      <Link href={node.path.alias} passHref>
        <a className="no-underline hover:text-blue-600">
          <h2 className="mb-4 text-4xl font-bold">{node.title}</h2>
        </a>
      </Link>
      <div className="mb-4 text-gray-600">
        {node.field_display_author?.title ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.field_display_author?.title}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_article_image && (
        <div className="my-6 overflow-hidden rounded-md">
          <MediaImage
            media={node.field_article_image}
            priority
            sizes="(min-width: 768px) 625px, 100vw"
            imageStyle="coh_medium"
          />
        </div>
      )}
      <Link href={node.path.alias} passHref>
        <a className="inline-flex items-center px-6 py-2 border border-gray-600 rounded-full hover:bg-gray-100">
          Read article
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 ml-2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </Link>
    </article>
  )
}
