import { Temporal } from "@js-temporal/polyfill";

import { graphql } from "$houdini";
import { Feed, type Item } from "feed";
import type { Category } from "feed/lib/typings";
import type { ArticleFeedQuery$result } from "$houdini";

export const FEED_QUERY = graphql`
  query ArticleFeedQuery {
    generalSettings {
      title @required
      description
      timezone
    }
    posts(where: { orderby: { field: DATE, order: DESC } }, first: 10) {
      nodes {
        title @required
        uri @required
        excerpt @required
        content @required
        dateGmt @required
        modifiedGmt @required
        author {
          node {
            name @required
            url @required
          }
        }
        categories {
          nodes {
            name @required
            slug @required
            uri @required
          }
        }
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
`;

export function createFeed(
  { feed_data, last_modified, site_url }: {
    feed_data: ArticleFeedQuery$result;
    last_modified: Temporal.PlainDateTime;
    site_url: string;
  },
) {
  if (!feed_data.generalSettings) {
    throw new Error("Missing generalSettings");
  }

  const feed = new Feed({
    title: `${feed_data.generalSettings.title} Articles`,
    description: feed_data.generalSettings.description || undefined,
    id: `${site_url}/articles/`,
    link: `${site_url}/articles/`,
    language: "en",
    // image: `${site_url}/logo-wpgraphql.png`,
    // favicon: `${site_url}/favicon.ico`,
    copyright: Temporal.Now.plainDateISO().year.toString(),
    updated: new Date(last_modified.toString()),
    feedLinks: {
      json: `${site_url}/feeds/feed.json`,
      atom: `${site_url}/feeds/feed.atom`,
      rss: `${site_url}/feeds/rss.xml`,
    },
  });

  if (!feed_data.posts || !feed_data.posts.nodes) {
    throw new Error("Missing posts");
  }

  for (const post of feed_data.posts.nodes) {
    const author = post.author?.node;
    const categories = post.categories?.nodes;
    const post_url = `${site_url}${post.uri}`;

		const feedItem: Item = {
      id: post_url,
      link: post_url,
      title: post.title,
      description: post.excerpt ?? undefined,
      content: post.content ?? undefined,
      date: new Date(post.modifiedGmt),
      published: new Date(post.dateGmt),
    };

		if(Array.isArray(categories)) {
			feedItem.category = categories.map((category): Category => {
				const link = `${site_url}${category.uri}`;
				return {
					term: category.slug,
					scheme: link,
					domain: link,
					name: category.name,
				};
			});
		}

		if(author) {
			feedItem.author = [
				{
					name: author.name,
					link: author.url,
				},
			];
		}

    feed.addItem(feedItem);
  }

  return feed;
}
