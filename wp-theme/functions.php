<?php

// Add support for post thumbnails and menus
add_theme_support('post-thumbnails');

// Add support for menus
add_theme_support('menus');

function register_my_menus()
{
	register_nav_menus(
		array(
			'primary-nav-menu' => __('Primary Navigation Menu'),
		)
	);
}

add_action('init', 'register_my_menus');

/* Filter Rest URL
* Site Address = WP_SITEURL = get_site_url() // Front-end of site
* Home Address = WP_HOME = get_home_url() // Admin site
* Rest URL = get_rest_url() // API URL (defaults to WP_SITEURL and this overrides it to WP_HOME)
*/
function rest_to_site_url($url)
{
	$url = str_replace(home_url(), site_url(), $url);;

	return $url;
}

add_filter('rest_url', 'rest_to_site_url', 10, 1);

/* Setup URLs to be Relative
* See: https://deluxeblogtips.com/relative-urls/
*/
// add_action('template_redirect', 'rw_relative_urls');

// function rw_relative_urls()
// {
// Don't do anything if:
// - In feed
// - In sitemap by WordPress SEO plugin
if (is_feed() || get_query_var('sitemap')) {
	return;
} else {


	$filters = array(
		'post_link',
		'post_type_link',
		'page_link',
		'attachment_link',
		'get_shortlink',
		'post_type_archive_link',
		'get_pagenum_link',
		'get_comments_pagenum_link',
		'term_link',
		'search_link',
		'day_link',
		'month_link',
		'year_link',
	);

	foreach ($filters as $filter) {
		add_filter($filter, 'wp_make_link_relative');
	}
}

/**
 * Change the excerpt more string
 */
function my_theme_excerpt_more($more)
{
	return '&hellip;';
}
add_filter('excerpt_more', 'my_theme_excerpt_more');

/**
 * Disable WP Feeds. Because content is rendered I think we can't proxy these in the long run and need to disable them.
 */
function itsme_disable_feed()
{
	wp_die(__('No feed available'), __('Error'), array('response' => 404, 'back_link' => true, 'link_text' => __('Go back home'), 'link_url' => home_url()));
}

add_action('do_feed', 'itsme_disable_feed', 1);
add_action('do_feed_rdf', 'itsme_disable_feed', 1);
add_action('do_feed_rss', 'itsme_disable_feed', 1);
add_action('do_feed_rss2', 'itsme_disable_feed', 1);
add_action('do_feed_atom', 'itsme_disable_feed', 1);
add_action('do_feed_rss2_comments', 'itsme_disable_feed', 1);
add_action('do_feed_atom_comments', 'itsme_disable_feed', 1);

/**
 * Rank Math URL Check ignore
 * Filter whether we need to check for URL mismatch or not.
 */
add_filter('rank_math/registration/do_url_check', '__return_false');
