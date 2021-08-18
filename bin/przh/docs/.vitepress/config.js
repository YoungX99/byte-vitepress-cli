module.exports = {
	title: "Byte-VitePress-CLI",
	description: "A lightweight CLI for VitePress project, and supports bilingual template selection.",
	head: [
    ["link", { rel: "icon", href: "/_assets/img/logo.png" }]
  ],
	themeConfig: {
		nav: getNavBar(),
		sidebar: {
			"/category/": getCategorySidebar(),
		},
		lastUpdated: "最后更新于",
		repo: "YoungX99/byte-vitepress-cli",
		editLinks: true, //编辑按钮

		// 文档搜索插件
		// algolia: {
		//   apiKey: 'your_api_key',
		//   indexName: 'index_name'
		// }
		// 广告推送插件
		// carbonAds: {
		//   carbon: 'your-carbon-key',
		//   custom: 'your-carbon-custom',
		//   placement: 'your-carbon-placement'
		// }
	},
};

function getCategorySidebar() {
	return [
		{
			children: [
				{ text: "Category", link: "/category/" },
				{ text: "文章1", link: "/category/article-1" },
				{ text: "文章2", link: "/category/article-2" },
			],
		},
	];
}
function getNavBar() {
	return [
		// Nav 1
		{
			text: "Home",
			link: "/",
		},
		// Nav 2
		{
			text: "Category",
			link: "/category/",
		},
	];
}
