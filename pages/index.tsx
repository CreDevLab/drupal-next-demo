import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { getMenus } from "lib/get-menu"

interface IndexPageProps {
  nodes: DrupalNode[],
  menus
}

export default function IndexPage({ nodes, menus }: IndexPageProps) {
  return (
    <Layout menus={menus}>
      <Head>
        <title>Drupal + Next.js</title>
        <meta
          name="description"
          content="Drupal + Next.js."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Latest Articles.</h1>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <NodeArticleTeaser node={node} />
              <hr className="my-20" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,field_article_image,uid,created,field_display_author",
        include: "field_article_image.image,field_display_author",
        sort: "-created"
      },
    }
  )

  return {
    props: {
      nodes,
      menus: await getMenus(context),
    },
  }
}
