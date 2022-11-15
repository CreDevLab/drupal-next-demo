import * as React from "react"
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { NodeArticle } from "components/node--article"
import { NodeBasicPage } from "components/node--basic-page"
import { Layout, LayoutProps } from "components/layout"
import { getPrioritizedStaticPathsFromContext } from '../lib/get-prioritized-static-paths';
import { Article } from "./types/drupal"
import { getMenus } from "lib/get-menu"

// List of all the entity types handled by this route.
export const ENTITY_TYPES = [
  'node--page',
  'node--article',
  'node--person',
  'taxonomy_term--article_type',
  'taxonomy_term--person_type',
  'taxonomy_term--tags',
  'taxonomy_term--categories'
];

interface NodePageProps {
  resource: Article,
  menus
}

export default function NodePage({ resource, menus }: NodePageProps) {
  if (!resource) return null

  return (
    <Layout menus={menus}>
      <Head>
        <title>{resource.title}</title>
        <meta name="description" content="Next.js + Drupal." />
      </Head>
      {resource.type === "node--page" && <NodeBasicPage node={resource} />}
      {resource.type === "node--article" && <NodeArticle node={resource} />}
    </Layout>
  )
}

export async function getStaticPaths(context: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  // By limiting the number of static paths, larger sites can keep build times
  // within a reasonable timeframe.
  const limit = 100;
  const paths = await getPrioritizedStaticPathsFromContext(
    context,
    ENTITY_TYPES,
  );

  return {
    paths: paths.slice(0, limit),
    fallback: 'blocking',
  };
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context)

  if (!path) {
    return {
      notFound: true,
    }
  }

  const type = path.jsonapi.resourceName

  let params = {}
  if (type === "node--article") {
    params = {
      include: "field_article_image.image,uid,field_tags,field_site,field_display_author",
    }
  }

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params,
    }
  )

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`)
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      resource,
      menus: await getMenus(context),
    },
  }
}