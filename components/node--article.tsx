import { DrupalNode } from "next-drupal"
import Link from "next/link"
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import { absoluteUrl, formatDate } from "lib/utils"
import { MediaImage } from "./media--image"

interface NodeArticleProps {
  node: DrupalNode
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
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
      {node.body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.body?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
      <div className="grid grid-cols-2 place-content-between  mt-6">
        <div>
      {node.field_previous_link?.url && (
      <Link href={node.field_previous_link?.url} passHref>
        <a className="no-underline hover:text-blue-600 flex justify-start">
          <h3 className="mb-4 text-2xl font-bold"><ArrowLeftCircleIcon className="inline h-12 w-12 text-emerald-600"/> {node.field_previous_link?.title}</h3>
        </a>
      </Link>
      )}
      </div>
      <div>
      {node.field_next_link?.url && (
      <Link href={node.field_next_link?.url} passHref>
        <a className="no-underline hover:text-blue-600 flex justify-end">
          <h3 className="mb-4 text-2xl font-bold"> {node.field_next_link?.title} <ArrowRightCircleIcon className="inline h-12 w-12 text-emerald-600"/></h3>
        </a>
      </Link>
      )}
      </div>
      </div>
    </article>
  )
}
