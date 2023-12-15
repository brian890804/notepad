require("babel-register")({
  presets: ["es2015", "react"],
});

const router = [
  {
    path: "/",
  },
  {
    path: "/posts",
  },
  {
    path: "/posts/main",
  },
  {
    path: "/posts/main/track",
  },
  {
    path: "/posts/dynamic/:dynamicId",
  },
  {
    path: "/social",
  },
  {
    path: "/social/local",
  },
  {
    path: "/social/profile/:profileId",
  },
  {
    path: "/vendor",
  },
  {
    path: "/vendor/category/:category",
  },
  {
    path: "/vendor/goods/:goodsId",
  },
  {
    path: "/vendor/sheet/:goodsId/:buyType",
  },
  {
    path: "/profile",
  },
  {
    path: "/profile/setInfo",
  },
  {
    path: "/profile/vip",
  },
  {
    path: "/profile/vip/common",
  },
  {
    path: "/profile/vip/sex",
  },
  {
    path: "/profile/vip/video",
  },
  {
    path: "/profile/edit",
  },
  {
    path: "/profile/payment",
  },
  {
    path: "/profile/transfer",
  },
  {
    path: "/profile/transfer",
  },
  {
    path: "/profile/record",
  },
  {
    path: "/profile/bundle",
  },
  {
    path: "/profile/bundle/coupon",
  },
  {
    path: "/profile/bundle/gift",
  },
  {
    path: "/profile/payment_record",
  },
  {
    path: "/profile/share",
  },
  {
    path: "/profile/switchLanguage",
  },
  {
    path: "/profile/collect",
  },
  {
    path: "/profile/collect/comic",
  },
  {
    path: "/profile/collect/anime",
  },
  {
    path: "/profile/collect/video",
  },
  {
    path: "/profile/collect/novel",
  },
  {
    path: "/profile/collect/photo",
  },
  {
    path: "/profile/mission",
  },
  {
    path: "/profile/myorder",
  },
  {
    path: "/profile/myorderDetail/:orderId",
  },
  {
    path: "/profile/watch_history",
  },
  {
    path: "/profile/watch_history/anime",
  },
  {
    path: "/profile/watch_history/comic",
  },
  {
    path: "/profile/purchase_record",
  },
  {
    path: "/profile/purchase_record/comic",
  },
  {
    path: "/profile/purchase_record/anime",
  },
  {
    path: "/profile/purchase_record/video",
  },
  {
    path: "/profile/purchase_record/novel",
  },
  {
    path: "/profile/purchase_record/photo",
  },
  {
    path: "/profile/purchase_record/social",
  },
  {
    path: "/profile/feedback",
  },
  {
    path: "/login",
  },
  {
    path: "/login/other/:loginType",
  },
  {
    path: "/login/recoverPassword",
  },
  {
    path: "/login/resetPassword",
  },
  {
    path: "/login/signup",
  },
  {
    path: "/notice",
  },
  {
    path: "/notice/:noticeId",
  },
  {
    path: "/home",
  },
  {
    path: "/home/games",
  },
  {
    path: "/home/search",
  },
  {
    path: "/home/search/result/:search",
  },
  {
    path: "/home/search/result/:search/SAC",
  },
  {
    path: "/home/search/result/:search/SAV",
  },
  {
    path: "/home/search/result/:search/SV",
  },
  {
    path: "/home/search/result/:search/SX",
  },
  {
    path: "/home/search/result/:search/ST",
  },
  {
    path: "/home/video",
  },
  {
    path: "/home/video/:videoId",
  },
  {
    path: "/home/anime",
  },
  {
    path: "/home/anime/:animeId/:animeEp",
  },
  {
    path: "/home/comic",
  },
  {
    path: "/home/comic/:comicId",
  },
  {
    path: "/home/comic/:comicId",
  },
  {
    path: "/home/comic/:comicId/:ep",
  },
  {
    path: "/home/novelsContent/:novelId",
  },
  {
    path: "/home/novels/:category",
  },
  {
    path: "/home/photos/:category",
  },
  {
    path: "/home/photosContent/:photoId",
  },
  {
    path: "/home/category/leaderboard",
  },
  {
    path: "/home/category/leaderboard",
  },
  {
    path: "/home/category/leaderboard/anime",
  },
  {
    path: "/home/category/:tab",
  },
  {
    path: "/home/label/:type/:label",
  },
  {
    path: "/home/main",
  },
  {
    path: "/home/main/novels",
  },
  {
    path: "/home/main/photos",
  },
  {
    path: "/home/main/streams",
  },
  {
    path: "/home/main/videos",
  },
  {
    path: "/home/main/404",
  },
];

const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://91bblili.com")
    .save("./public/sitemap.xml");
}

generateSitemap();
