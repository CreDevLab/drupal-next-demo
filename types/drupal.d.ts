import { DrupalNode } from "next-drupal"

interface SiteNode extends DrupalNode {
    field_site?: {
        meta: {
            drupal_internal__target_id: string
        }
    }
}


export interface Article extends SiteNode {
    field_next_link?: Link,
    field_previous_link?: Link
}

export interface Link {
    uri: string,
    title?: string,
    url: string
}
