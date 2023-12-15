/**
 * react routes data center
 */

import { pageUrlConstants } from "../constants";

import StartPage from "../pages/start/StartHandle";

import HomePage from "../pages/home/Home";
import HomeMainSwitchPage from "../pages/homeMainSwitch/HomeMainSwitchHandle";
import HomeLeaderboardPage from "../pages/homeLeaderboard/HomeLeaderboard";
import HomeLeaderboardComicPage from "../pages/homeLeaderboard/homeLeaderboardComic/HomeLeaderboardComicHandle";
import HomeLeaderboardAnimePage from "../pages/homeLeaderboard/homeLeaderboardAnime/HomeLeaderboardAnimeHandle";
import HomeCategoryPage from "../pages/homeCategory/HomeCategoryHandle";
import HomeLablePage from "../pages/homeLabel/HomeLableHandle";
import HomeSearchPage from "../pages/homeSearch/HomeSearchHandle";
import HomeSearchMainPage from "../pages/homeSearchMain/HomeSearchMainHandle";
import HomeSearchResultPage from "../pages/homeSearchResult/HomeSearchResultHandle";
import HomeSearchResultSAC from "../pages/homeSearchResult/homeSearchResultSAC/HomeSearchResultSAC";
import HomeSearchResultSAV from "../pages/homeSearchResult/homeSearchResultSAV/HomeSearchResultSAV";
import HomeSearchResultSV from "../pages/homeSearchResult/homeSearchResultSV/HomeSearchResultSV";
import HomeSearchResultSX from "../pages/homeSearchResult/homeSearchResultSX/HomeSearchResultSX";
import HomeSearchResultST from "../pages/homeSearchResult/homeSearchResultST/HomeSearchResultST";
import HomeAnimesPage from "../pages/homeAnimes/HomeAnimesHandle";
import HomeMainPage from "../pages/homeMain/HomeMainHandle";
import HomeAnimeSwitchPage from "../pages/homeAnimesSwitch/HomeAnimeSwitch";
import HomeAnimesContentPage from "../pages/homeAnimesContent/HomeAnimesContentHandle";
import HomeComicListPage from "../pages/homeComicList/HomeComicList";
import HomeComicListSwitchPage from "../pages/homeComicListSwitch/HomeComicListSwitch";
import HomeComicListContentPage from "../pages/homeComicListContent/HomeComicListContentHandle";
import HomeComicListContentViewPage from "../pages/homeComicListContentView/HomeComicListContentViewHandle";
import HomeNovelsPage from "../pages/homeNovels/HomeNovelsHandle";
import HomeNovelsListPage from "../pages/homeNovelsList/HomeNovelsListHandle";
import HomeNovelsContentPage from "../pages/homeNovelsContent/HomeNovelsContentHandle";
import HomePhotosPage from "../pages/homePhotos/HomePhotosHandle";
import HomePhotosListPage from "../pages/homePhotosList/HomePhotosListHandle";
import HomePhotosContentPage from "../pages/homePhotosContent/HomePhotosContentHandle";
import HomeStreamsPage from "../pages/homeStreams/HomeStreamsHandle";
import HomeVideosPage from "../pages/homeVideos/HomeVideosHandle";
import HomeVideosSelectPage from "../pages/homeVideosSelect/HomeVideosSelectHandle";
import HomeVideoSwitchPage from "../pages/homeVideoSwitch/HomeVideoSwitch";
import HomeVideoContentPage from "../pages/homeVideoContent/HomeVideoContentHandle";
import HomeProtocolPage from "../pages/homeProtocol/HomeProtocolRender";
import HomeEULAPage from "../pages/homeProtocol/homeEULA/HomeEULARender";

import GamesPage from "../pages/Games/GameHandle";

import NoticePage from "../pages/notice/Notice";
import NoticeListPage from "../pages/noticeList/NoticeListHandle";
import NoticeContentPage from "../pages/noticeContent/NoticeContentHandle";

import LoginPage from "../pages/login/Login";
import LoginMainPage from "../pages/loginMain/LoginMainHandle";
import LoginMainOtherPage from "../pages/loginMainOther/LoginMainOtherHandle";
import LoginRecoverPasswordPage from "../pages/loginRecoverPassword/LoginRecoverPasswordHandle";
import LoginResetPasswordPage from "../pages/loginResetPassword/LoginResetPasswordHandle";
import LoginSignupHandlePage from "../pages/loginSignup/LoginSignupHandle";

import PostsPage from "../pages/posts/Posts";
import PostsMainPage from "../pages/postsMain/PostsMain";
import PostsAddModalPage from "../pages/component/ModalRender";
import PostsAddPage from "../pages/postsAdd/PostsAddHandle";
import PostsAddTagPage from "../pages/postAddTags/PostAddTagsHandle";
import postsMainNewPage from "../pages/postsMainNew/PostsMainNewHandle";
import PostsMainTrackPage from "../pages/postsMainTrack/PostsMainTrackHandle";
import PostsCardDetailPage from "../pages/postCardDetail/PostsCardDetailHandle";
import PostsProfilePage from "../pages/postsProfile/PostsProfileHandle";

import SocialPage from "../pages/social/Social";
import SocialListPage from "../pages/socialList/SocialListHandle";
import SocialSelectLocalPage from "../pages/socialSelectLocal/SocialSelectLocalHandle";
import SocialDetailInfoPage from "../pages/socialDetailInfo/SocialDetailInfoHandle";

import VendorPage from "../pages/vendor/Vendor";
import VendorMainPage from "../pages/vendorMain/VendorMainHandle";
import VendorCategoryPage from "../pages/vendorCategory/VendorCategoryHandle";
import VendorGoodsPage from "../pages/vendorGoods/VendorGoodsHandle";
import VendorSheetPage from "../pages/vendorSheet/VendorSheetHandle";

import ProfilePage from "../pages/profile/Profile";
import ProfileMainPage from "../pages/profileMain/ProfileMainHandle";
import ProfileSetInfoPage from "../pages/profileSetInfo/ProfileSetInfoHandle";
import ProfileEditInfoPage from "../pages/profileEditInfo/ProfileEditInfoHandle";
import ProfileEditNickNamePage from "../pages/profileEditNickName/ProfileEditNickNameHandle";
import ProfileBuyVipPage from "../pages/profileBuyVip/ProfileBuyVip";
import ProfileBuyVipCommonPage from "../pages/profileBuyVipCommon/ProfileBuyVipCommonHandle";
import ProfileBuyVipSexPage from "../pages/profileBuyVipSex/ProfileBuyVipSexHandle";
import ProfileBuyVipVideoPage from "../pages/profileBuyVipVideo/profileBuyVipVideoHandle";
import ProfilePaymentPage from "../pages/profilePayment/ProfilePaymentHandle";
import profilePaymentDirectBuyVipPage from "../pages/profilePaymentDirectBuyVip/ProfilePaymentDirectBuyVipHandle";
import ProfileTransferCoinPage from "../pages/profileTransferCoin/ProfileTransferCoinHandle";
import ProfileTransferRecordPage from "../pages/profileTransferRecord/ProfileTransferRecordHandle";
import ProfilePaymentRecordPage from "../pages/profilePaymentRecord/ProfilePaymentRecordHandle";
import ProfileSharePage from "../pages/profileShare/ProfileShare";
import ProfileSwitchLanguage from "../pages/profileSwitchLanguage/ProfileSwitchLanguage";
import ProfileMyCollectPage from "../pages/profileMyCollect/ProfileMyCollectHandle";
import ProfileMyCollectComicPage from "../pages/profileMyCollect/profileMyCollectComic/ProfileMyCollectComicHandle";
import ProfileMyCollectAnimePage from "../pages/profileMyCollect/profileMyCollectAnime/ProfileMyCollectAnimeHandle";
import ProfileMyCollectVideoPage from "../pages/profileMyCollect/profileMyCollectVideo/ProfileMyCollectVideoHandle";
import ProfileMyCollectNovelPage from "../pages/profileMyCollect/profileMyCollectNovel/ProfileMyCollectNovelHandle";
import ProfileMyCollectPhotoPage from "../pages/profileMyCollect/profileMyCollectPhoto/ProfileMyCollectPhotoHandle";
import ProfileMissionPage from "../pages/profileMission/ProfileMissionHandle";
import profileMyorderPage from "../pages/profileMyorder/ProfileMyorderHandle";
import ProfileMyorderDetailPage from "../pages/profileMyorderDetail/ProfileMyorderDetailHandle";
import profilePurchaseRecordPage from "../pages/profilePurchaseRecord/ProfilePurchaseRecord";
import ProfilePurchaseRecordComicPage from "../pages/profilePurchaseRecord/profilePurchaseRecordComic/ProfilePurchaseRecordComicHandle";
import ProfilePurchaseRecordAnimePage from "../pages/profilePurchaseRecord/profilePurchaseRecordAnime/ProfilePurchaseRecordAnimeHandle";
import ProfilePurchaseRecordVideoPage from "../pages/profilePurchaseRecord/profilePurchaseRecordVideo/ProfilePurchaseRecordVideoHandle";
import ProfilePurchaseRecordNovelPage from "../pages/profilePurchaseRecord/profilePurchaseRecordNovel/ProfilePurchaseRecordNovelHandle";
import ProfilePurchaseRecordPhotoPage from "../pages/profilePurchaseRecord/profilePurchaseRecordPhoto/ProfilePurchaseRecordPhotoHandle";
import ProfilePurchaseRecordSocialPage from "../pages/profilePurchaseRecord/profilePurchaseRecordSocial/ProfilePurchaseRecordSocialHandle";
import ProfileFeedbackPage from "../pages/profileFeedback/ProfileFeedbackHandle";
import profileBundlePage from "../pages/profileBundleMain/ProfileBundleMain";
import profileBundleCouponPage from "../pages/profileBundleMain/profileBundleCoupon/ProfileBundleCouponHandle";
import profileBundleGiftPage from "../pages/profileBundleMain/profileBundleGift/ProfileBundleGiftHandle";
import profileBundleRewardPage from "../pages/profileBundleMain/profileBundleReward/ProfileBundleRewardHandle";
import ProfileWatchHistoryPage from "../pages/profileWatchHistory/ProfileWatchHistory";
import profileWatchHistoryAnimePage from "../pages/profileWatchHistory/profileWatchHistoryAnime/ProfileWatchHistoryAnimeHandle";
import profileWatchHistoryComicPage from "../pages/profileWatchHistory/profileWatchHistoryComic/ProfileWatchHistoryComicHandle";
import ProfilePaymentWithDrawPage from "../pages/profilePaymentWithDraw/ProfilePaymentWithDrawHandle";
import ProfilePaymentWithDrawHistoryPage from "../pages/profilePaymentWithDrawHistory/ProfilePaymentWithDrawHistoryHandle";
import PostsNoticePage from "../pages/postsNotice/PostsNoticeHandle";
import PostGetRecommendOriginalPage from "../pages/postsMoreOriginal/PostsMoreOriginalHandle";
import PostsRecommendFriendPage from "../pages/postsRecommendFriend/PostsRecommendFriendHandle";
import PostsSameTagListPage from "../pages/postsSameTagList/PostsSameTagListHandle";
const { start, home, notice, post, social, vendor, profile, login } =
  pageUrlConstants;

export const routes = [
  {
    name: profile.name,
    path: profile.path,
    component: ProfilePage,
    routes: [
      {
        name: profile.pages.profileBundle.name,
        path: profile.pages.profileBundle.path,
        component: profileBundlePage,
        routes: [
          {
            name: profile.pages.profileBundle.pages.profileBundleCoupon.name,
            path: profile.pages.profileBundle.pages.profileBundleCoupon.path,
            component: profileBundleCouponPage,
          },
          {
            name: profile.pages.profileBundle.pages.profileBundleGift.name,
            path: profile.pages.profileBundle.pages.profileBundleGift.path,
            component: profileBundleGiftPage,
          },
          {
            name: profile.pages.profileBundle.pages.profileBundleReward.name,
            path: profile.pages.profileBundle.pages.profileBundleReward.path,
            component: profileBundleRewardPage,
          },
        ],
      },
      {
        name: profile.pages.profileFeedback.name,
        path: profile.pages.profileFeedback.path,
        component: ProfileFeedbackPage,
      },
      {
        name: profile.pages.profileWatchHistory.name,
        path: profile.pages.profileWatchHistory.path,
        component: ProfileWatchHistoryPage,
        routes: [
          {
            name: profile.pages.profileWatchHistory.pages
              .profileWatchHistoryAnime.name,
            path: profile.pages.profileWatchHistory.pages
              .profileWatchHistoryAnime.path,
            component: profileWatchHistoryAnimePage,
          },
          {
            name: profile.pages.profileWatchHistory.pages
              .profileWatchHistoryComic.name,
            path: profile.pages.profileWatchHistory.pages
              .profileWatchHistoryComic.path,
            component: profileWatchHistoryComicPage,
          },
        ],
      },
      {
        name: profile.pages.profilePurchaseRecord.name,
        path: profile.pages.profilePurchaseRecord.path,
        component: profilePurchaseRecordPage,
        routes: [
          {
            name: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordComic.name,
            path: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordComic.path,
            component: ProfilePurchaseRecordComicPage,
          },
          {
            name: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordAnime.name,
            path: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordAnime.path,
            component: ProfilePurchaseRecordAnimePage,
          },
          {
            name: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordVideo.name,
            path: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordVideo.path,
            component: ProfilePurchaseRecordVideoPage,
          },
          {
            name: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordNovel.name,
            path: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordNovel.path,
            component: ProfilePurchaseRecordNovelPage,
          },
          {
            name: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordPhoto.name,
            path: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordPhoto.path,
            component: ProfilePurchaseRecordPhotoPage,
          },
          {
            name: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordSocial.name,
            path: profile.pages.profilePurchaseRecord.pages
              .profilePurchaseRecordSocial.path,
            component: ProfilePurchaseRecordSocialPage,
          },
        ],
      },
      {
        name: profile.pages.profileMission.name,
        path: profile.pages.profileMission.path,
        component: ProfileMissionPage,
      },
      {
        name: profile.pages.profileMyCollect.name,
        path: profile.pages.profileMyCollect.path,
        component: ProfileMyCollectPage,
        routes: [
          {
            name: profile.pages.profileMyCollect.pages.profileMyCollectComic
              .name,
            path: profile.pages.profileMyCollect.pages.profileMyCollectComic
              .path,
            component: ProfileMyCollectComicPage,
          },
          {
            name: profile.pages.profileMyCollect.pages.profileMyCollectAnime
              .name,
            path: profile.pages.profileMyCollect.pages.profileMyCollectAnime
              .path,
            component: ProfileMyCollectAnimePage,
          },
          {
            name: profile.pages.profileMyCollect.pages.profileMyCollectVideo
              .name,
            path: profile.pages.profileMyCollect.pages.profileMyCollectVideo
              .path,
            component: ProfileMyCollectVideoPage,
          },
          {
            name: profile.pages.profileMyCollect.pages.profileMyCollectNovel
              .name,
            path: profile.pages.profileMyCollect.pages.profileMyCollectNovel
              .path,
            component: ProfileMyCollectNovelPage,
          },
          {
            name: profile.pages.profileMyCollect.pages.profileMyCollectPhoto
              .name,
            path: profile.pages.profileMyCollect.pages.profileMyCollectPhoto
              .path,
            component: ProfileMyCollectPhotoPage,
          },
        ],
      },
      {
        name: profile.pages.profileShare.name,
        path: profile.pages.profileShare.path,
        component: ProfileSharePage,
      },
      {
        name: profile.pages.profileSwitchLanguage.name,
        path: profile.pages.profileSwitchLanguage.path,
        component: ProfileSwitchLanguage,
      },
      {
        name: profile.pages.profileMyorder.name,
        path: profile.pages.profileMyorder.path,
        component: profileMyorderPage,
      },
      {
        name: profile.pages.profileMyorderDetail.name,
        path: profile.pages.profileMyorderDetail.path,
        component: ProfileMyorderDetailPage,
      },
      {
        name: profile.pages.profilePaymentWithDrawHistory.name,
        path: profile.pages.profilePaymentWithDrawHistory.path,
        component: ProfilePaymentWithDrawHistoryPage,
      },
      {
        name: profile.pages.profilePaymentWithDraw.name,
        path: profile.pages.profilePaymentWithDraw.path,
        component: ProfilePaymentWithDrawPage,
      },

      {
        name: profile.pages.profilePaymentRecord.name,
        path: profile.pages.profilePaymentRecord.path,
        component: ProfilePaymentRecordPage,
      },

      {
        name: profile.pages.profilePayment.name,
        path: profile.pages.profilePayment.path,
        component: ProfilePaymentPage,
      },
      {
        name: profile.pages.profileDirectBuyVip.name,
        path: profile.pages.profileDirectBuyVip.path,
        component: profilePaymentDirectBuyVipPage,
      },
      {
        name: profile.pages.profileTransferCoin.name,
        path: profile.pages.profileTransferCoin.path,
        component: ProfileTransferCoinPage,
      },
      {
        name: profile.pages.profileTransferRecord.name,
        path: profile.pages.profileTransferRecord.path,
        component: ProfileTransferRecordPage,
      },
      {
        name: profile.pages.profileBuyVip.name,
        path: profile.pages.profileBuyVip.path,
        component: ProfileBuyVipPage,
        routes: [
          {
            name: profile.pages.profileBuyVip.pages.profileBuyVipCommon.name,
            path: profile.pages.profileBuyVip.pages.profileBuyVipCommon.path,
            component: ProfileBuyVipCommonPage,
          },
          {
            name: profile.pages.profileBuyVip.pages.profileBuyVipSex.name,
            path: profile.pages.profileBuyVip.pages.profileBuyVipSex.path,
            component: ProfileBuyVipSexPage,
          },
          {
            name: profile.pages.profileBuyVip.pages.profileBuyVipVideo.name,
            path: profile.pages.profileBuyVip.pages.profileBuyVipVideo.path,
            component: ProfileBuyVipVideoPage,
          },
        ],
      },
      {
        name: profile.pages.profileSetInfo.name,
        path: profile.pages.profileSetInfo.path,
        component: ProfileSetInfoPage,
      },
      {
        name: profile.pages.profileEdit.pages.profileEditNickName.name,
        path: profile.pages.profileEdit.pages.profileEditNickName.path,
        component: ProfileEditNickNamePage,
      },
      {
        name: profile.pages.profileEdit.pages.profileEditInfo.name,
        path: profile.pages.profileEdit.pages.profileEditInfo.path,
        component: ProfileEditInfoPage,
      },

      {
        name: profile.pages.profileMain.name,
        path: profile.pages.profileMain.path,
        component: ProfileMainPage,
      },
    ],
  },
  {
    name: vendor.name,
    path: vendor.path,
    component: VendorPage,
    routes: [
      {
        name: vendor.pages.vendorSheet.name,
        path: vendor.pages.vendorSheet.path,
        component: VendorSheetPage,
      },
      {
        name: vendor.pages.vendorGoods.name,
        path: vendor.pages.vendorGoods.path,
        component: VendorGoodsPage,
      },
      {
        name: vendor.pages.vendorCategory.name,
        path: vendor.pages.vendorCategory.path,
        component: VendorCategoryPage,
      },
      {
        name: vendor.pages.vendorMain.name,
        path: vendor.pages.vendorMain.path,
        component: VendorMainPage,
      },
    ],
  },
  {
    name: social.name,
    path: social.path,
    component: SocialPage,
    routes: [
      {
        name: social.pages.socialDetailInfo.name,
        path: social.pages.socialDetailInfo.path,
        component: SocialDetailInfoPage,
      },
      {
        name: social.pages.socialSelectLocal.name,
        path: social.pages.socialSelectLocal.path,
        component: SocialSelectLocalPage,
      },
      {
        name: social.pages.socialList.name,
        path: social.pages.socialList.path,
        component: SocialListPage,
      },
    ],
  },
  {
    name: post.name,
    path: post.path,
    component: PostsPage,
    routes: [
      {
        name: post.pages.postMain.name,
        path: post.pages.postMain.path,
        component: PostsMainPage,
        routes: [
          {
            name: post.pages.postMain.pages.postAddModal.name,
            path: post.pages.postMain.pages.postAddModal.path,
            component: PostsAddModalPage,
          },
          {
            name: post.pages.postMain.pages.postSameTagList.name,
            path: post.pages.postMain.pages.postSameTagList.path,
            component: PostsSameTagListPage,
          },
          {
            name: post.pages.postMain.pages.postAddTags.name,
            path: post.pages.postMain.pages.postAddTags.path,
            component: PostsAddTagPage,
          },
          {
            name: post.pages.postMain.pages.postAdd.name,
            path: post.pages.postMain.pages.postAdd.path,
            component: PostsAddPage,
          },
          {
            name: post.pages.postMain.pages.postCard.name,
            path: post.pages.postMain.pages.postCard.path,
            component: PostsCardDetailPage,
          },
          {
            name: post.pages.postMain.pages.postProfile.name,
            path: post.pages.postMain.pages.postProfile.path,
            component: PostsProfilePage,
          },
          {
            name: post.pages.postMain.pages.postMoreOriginal.name,
            path: post.pages.postMain.pages.postMoreOriginal.path,
            component: PostGetRecommendOriginalPage,
          },
          {
            name: post.pages.postMain.pages.postMainRecommend.name,
            path: post.pages.postMain.pages.postMainRecommend.path,
            component: PostsRecommendFriendPage,
          },
          {
            name: post.pages.postMain.pages.postMainNotice.name,
            path: post.pages.postMain.pages.postMainNotice.path,
            component: PostsNoticePage,
          },
          {
            name: post.pages.postMain.pages.postMainTrack.name,
            path: post.pages.postMain.pages.postMainTrack.path,
            component: PostsMainTrackPage,
          },
          {
            name: post.pages.postMain.pages.postMainNew.name,
            path: post.pages.postMain.pages.postMainNew.path,
            component: postsMainNewPage,
          },
        ],
      },
    ],
  },
  {
    name: notice.name,
    path: notice.path,
    component: NoticePage,
    routes: [
      {
        name: notice.pages.noticeContent.name,
        path: notice.pages.noticeContent.path,
        component: NoticeContentPage,
      },
      {
        name: notice.pages.noticeList.name,
        path: notice.pages.noticeList.path,
        component: NoticeListPage,
      },
    ],
  },
  {
    name: login.name,
    path: login.path,
    component: LoginPage,
    routes: [
      {
        name: login.pages.loginOhter.name,
        path: login.pages.loginOhter.path,
        component: LoginMainOtherPage,
      },
      {
        name: login.pages.signup.name,
        path: login.pages.signup.path,
        component: LoginSignupHandlePage,
      },
      {
        name: login.pages.recoverPassword.name,
        path: login.pages.recoverPassword.path,
        component: LoginRecoverPasswordPage,
      },
      {
        name: login.pages.resetPassword.name,
        path: login.pages.resetPassword.path,
        component: LoginResetPasswordPage,
      },
      {
        name: login.pages.loginMain.name,
        path: login.pages.loginMain.path,
        component: LoginMainPage,
      },
    ],
  },
  {
    name: home.name,
    path: home.path,
    component: HomePage,
    routes: [
      {
        name: home.pages.homeGame.name,
        path: home.pages.homeGame.path,
        component: GamesPage,
      },
      {
        name: home.pages.homeLabel.name,
        path: home.pages.homeLabel.path,
        component: HomeLablePage,
      },
      {
        name: home.pages.homeNovelsContent.name,
        path: home.pages.homeNovelsContent.path,
        component: HomeNovelsContentPage,
      },
      {
        name: home.pages.homeNovelsList.name,
        path: home.pages.homeNovelsList.path,
        component: HomeNovelsListPage,
      },
      {
        name: home.pages.homePhotosList.name,
        path: home.pages.homePhotosList.path,
        component: HomePhotosListPage,
      },
      {
        name: home.pages.homePhotosContent.name,
        path: home.pages.homePhotosContent.path,
        component: HomePhotosContentPage,
      },
      {
        name: home.pages.homeVideoSwitch.name,
        path: home.pages.homeVideoSwitch.path,
        component: HomeVideoSwitchPage,
        routes: [
          {
            name: home.pages.homeVideoSwitch.pages.homeVideoContent.name,
            path: home.pages.homeVideoSwitch.pages.homeVideoContent.path,
            component: HomeVideoContentPage,
          },
        ],
      },
      {
        name: home.pages.homeAnimesSwitch.name,
        path: home.pages.homeAnimesSwitch.path,
        component: HomeAnimeSwitchPage,
        routes: [
          {
            name: home.pages.homeAnimesSwitch.pages.homeAnimesContent.name,
            path: home.pages.homeAnimesSwitch.pages.homeAnimesContent.path,
            component: HomeAnimesContentPage,
          },
        ],
      },
      {
        name: home.pages.homeComicList.name,
        path: home.pages.homeComicList.path,
        component: HomeComicListPage,
        routes: [
          {
            name: home.pages.homeComicList.pages.homeComicListSwitch.name,
            path: home.pages.homeComicList.pages.homeComicListSwitch.path,
            component: HomeComicListSwitchPage,
            routes: [
              {
                name: home.pages.homeComicList.pages.homeComicListSwitch.pages
                  .homeComicListContentView.name,
                path: home.pages.homeComicList.pages.homeComicListSwitch.pages
                  .homeComicListContentView.path,
                component: HomeComicListContentViewPage,
              },
              {
                name: home.pages.homeComicList.pages.homeComicListSwitch.pages
                  .homeComicListContent.name,
                path: home.pages.homeComicList.pages.homeComicListSwitch.pages
                  .homeComicListContent.path,
                component: HomeComicListContentPage,
              },
            ],
          },
        ],
      },
      {
        name: home.pages.homeLeaderboard.name,
        path: home.pages.homeLeaderboard.path,
        component: HomeLeaderboardPage,
        routes: [
          {
            name: home.pages.homeLeaderboard.pages.homeLeaderboardAnime.name,
            path: home.pages.homeLeaderboard.pages.homeLeaderboardAnime.path,
            component: HomeLeaderboardAnimePage,
          },
          {
            name: home.pages.homeLeaderboard.pages.homeLeaderboardComic.name,
            path: home.pages.homeLeaderboard.pages.homeLeaderboardComic.path,
            component: HomeLeaderboardComicPage,
          },
        ],
      },

      {
        name: home.pages.homeSearch.name,
        path: home.pages.homeSearch.path,
        component: HomeSearchPage,
        routes: [
          {
            name: home.pages.homeSearch.pages.homeSearchResult.name,
            path: home.pages.homeSearch.pages.homeSearchResult.path,
            component: HomeSearchResultPage,
            routes: [
              {
                name: home.pages.homeSearch.pages.homeSearchResult.pages
                  .homeSearchResultSAC.name,
                path: home.pages.homeSearch.pages.homeSearchResult.pages
                  .homeSearchResultSAC.path,
                component: HomeSearchResultSAC,
              },
              {
                name: home.pages.homeSearch.pages.homeSearchResult.pages
                  .homeSearchResultSAV.name,
                path: home.pages.homeSearch.pages.homeSearchResult.pages
                  .homeSearchResultSAV.path,
                component: HomeSearchResultSAV,
              },
              {
                name: home.pages.homeSearch.pages.homeSearchResult.pages
                  .homeSearchResultSV.name,
                path: home.pages.homeSearch.pages.homeSearchResult.pages
                  .homeSearchResultSV.path,
                component: HomeSearchResultSV,
              },
              {
                name: home.pages.homeSearch.pages.homeSearchResult.pages
                  .homeSearchResultSX.name,
                path: home.pages.homeSearch.pages.homeSearchResult.pages
                  .homeSearchResultSX.path,
                component: HomeSearchResultSX,
              },
              {
                name: home.pages.homeSearch.pages.homeSearchResult.pages
                  .homeSearchResultST.name,
                path: home.pages.homeSearch.pages.homeSearchResult.pages
                  .homeSearchResultST.path,
                component: HomeSearchResultST,
              },
            ],
          },
          {
            name: home.pages.homeSearch.pages.homeSearchMain.name,
            path: home.pages.homeSearch.pages.homeSearchMain.path,
            component: HomeSearchMainPage,
          },
        ],
      },
      {
        name: home.pages.homeMain.name,
        path: home.pages.homeMain.path,
        component: HomeMainSwitchPage,
        routes: [
          {
            name: home.pages.homeMain.pages.homeNovels.name,
            path: home.pages.homeMain.pages.homeNovels.path,
            component: HomeNovelsPage,
          },
          {
            name: home.pages.homeMain.pages.homePhotos.name,
            path: home.pages.homeMain.pages.homePhotos.path,
            component: HomePhotosPage,
          },
          {
            name: home.pages.homeMain.pages.homeStreams.name,
            path: home.pages.homeMain.pages.homeStreams.path,
            component: HomeStreamsPage,
          },
          {
            name: home.pages.homeMain.pages.homeVideos.name,
            path: home.pages.homeMain.pages.homeVideos.path,
            component: HomeVideosPage,
          },
          {
            name: home.pages.homeMain.pages.homeVideosSelect.name,
            path: home.pages.homeMain.pages.homeVideosSelect.path,
            component: HomeVideosSelectPage,
          },
          {
            name: home.pages.homeMain.pages.homeCategory.name,
            path: home.pages.homeMain.pages.homeCategory.path,
            component: HomeCategoryPage,
          },
          {
            name: home.pages.homeMain.pages.homeAnime.name,
            path: home.pages.homeMain.pages.homeAnime.path,
            component: HomeAnimesPage,
          },
          {
            name: home.pages.homeMain.pages.home.name,
            path: home.pages.homeMain.pages.home.path,
            component: HomeMainPage,
          },
        ],
      },
      {
        name: home.pages.homeProtocol.name,
        path: home.pages.homeProtocol.path,
        component: HomeProtocolPage,
        routes: [
          {
            name: home.pages.homeProtocol.pages.homeEULA.name,
            path: home.pages.homeProtocol.pages.homeEULA.path,
            component: HomeEULAPage,
          },
          {
            name: home.pages.homeProtocol.pages.homeTSM.name,
            path: home.pages.homeProtocol.pages.homeTSM.path,
            component: HomeEULAPage,
          },
        ],
      },
    ],
  },
  {
    name: start.name,
    path: start.path,
    component: StartPage,
  },
];

export default routes;
