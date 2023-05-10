import { Temporal } from "@js-temporal/polyfill"

import { graphql } from "$houdini"
import { Feed } from "feed"
import type { Category } from "feed/lib/typings"
import type { ArticleFeedQuery$result } from "$houdini"

export const FEED_QUERY = graphql`
  query ArticleFeedQuery {
    generalSettings {
      title
      description
      timezone
    }
    posts(where: { orderby: { field: DATE, order: DESC } }, first: 20) {
      nodes {
        title
        uri
        excerpt
        content
        dateGmt
        modifiedGmt
        author {
          node {
            name
            url
          }
        }
        categories {
          nodes {
            name
            slug
            uri
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
    }
    last_modified: posts(
      where: { orderby: { field: MODIFIED, order: DESC } }
      first: 1
    ) {
      nodes {
        modifiedGmt
      }
    }
  }
`

export function createFeed({ feed_data, last_modified, site_url }: { feed_data: NonNullable<ArticleFeedQuery$result>; last_modified: Temporal.PlainDateTime; site_url: string }) {
  const feed = new Feed({
    title: `${feed_data.generalSettings?.title} Articles`,
    description: feed_data.generalSettings?.description ?? undefined,
    id: `${site_url}/articles/`,
    link: `${site_url}/articles/`,
    language: "en",
    image: `${site_url}/logo-wpgraphql.png`,
    favicon: `${site_url}/favicon.ico`,
    copyright: Temporal.Now.plainDateISO().year.toString(),
    updated: new Date(last_modified.toString()),
    feedLinks: {
      json: `${site_url}/feeds/feed.json`,
      atom: `${site_url}/feeds/feed.atom`,
      rss: `${site_url}/feeds/rss.xml`,
    },
  })

  feed_data?.posts?.nodes?.forEach((post) => {
		if (!post || !post.author || !post.categories) {
			return;
		}
    const author = post.author.node
    const categories = post.categories.nodes

    feed.addItem({
      id: post.id,
      title: post.title,
      link: `${site_url}${post.uri}`,
      description: post.excerpt ?? undefined,
      content: post.content ?? undefined,
      date: new Date(post.modifiedGmt),
      published: new Date(post.dateGmt),
      author: [
        {
          name: author.name,
          link: author.url,
        },
      ],
      category: categories.map((category): Category => {
        const link = `${site_url}${category.uri}`
        return {
          term: category.slug,
          scheme: link,
          domain: link,
          name: category.name,
        }
      }),
    })
  })

  return feed
}
