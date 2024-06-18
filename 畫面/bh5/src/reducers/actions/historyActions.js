import { push, go, replace } from "connected-react-router";
import { pageUrlConstants } from "../../constants";
import { handleChangePage } from "../../modules/gtmEventHandle";
import store from "../../store";
const { home } = pageUrlConstants;

let timeClock;
/**
 * @description push routes and save crumbs and scrollPage
 *
 * @param {object} routes { name: string, path: string }
 * @return {*}
 */

export const pushRoutes = (routes) => {
  return function (dispatch) {
    let path = routesPathMaker(routes?.path, routes?.dynamic);
    googleAnalytics(routes);
    scrollPage();
    dispatch(push(path));
    dispatch({
      type: "CRUMBS_PUSH",
      data: {
        name: routes?.name,
        path: path,
      },
    });
  };
};
export const initRoutes = () => (dispatch) => {
  // setTimeout(
  //   () =>
  dispatch({
    type: "CRUMBS_PUSH",
    data: {
      name: "由網址進入第一次跳轉頁",
      path: window.location.pathname,
    },
  });
  // 5000
  // );
};

/**
 * @description replace routes and save crumbs and scrollPage
 *
 * @param {object} routes { name: string, path: string }
 * @return {*}
 */
export const replaceRoutes = (routes) => {
  return function (dispatch) {
    googleAnalytics(routes);
    let path = routesPathMaker(routes?.path, routes?.dynamic);
    scrollPage();
    dispatch(replace(path));
  };
};

/**
 * @description routes go back and check routes tree
 *
 * @return {*}
 */
export const backRoutes = (number, not_clear_history = false) => {
  return function (dispatch) {
    scrollPage();
    let breadcrumbs = store.getState().breadcrumbs;
    if (breadcrumbs.length > 1) {
      dispatch(go(number || -1));
      googleAnalytics(breadcrumbs[breadcrumbs.length - 1]);
      if (!not_clear_history) {
        dispatch({
          type: "CRUMBS_BACK",
        });
      }
    } else {
      // 這邊先都回到主頁，有需求降臨再利用　routes tree 判斷
      dispatch(pushRoutes(home.pages.homeMain));
      googleAnalytics(home.pages.homeMain);
    }
  };
};

function scrollPage() {
  let storeData = store.getState();
  window.sessionStorage.setItem(
    "scroll:" + storeData.router.location.pathname,
    document.documentElement.scrollTop
  );
  toScroll();
}
export function clearScrollPage() {
  let storeData = store.getState();
  window.sessionStorage.removeItem(
    "scroll:" + storeData.router.location.pathname
  );
}

function toScroll() {
  let storeData = store.getState();
  clearTimeout(timeClock);
  timeClock = setTimeout(() => {
    storeData = store.getState();
    if (
      document.documentElement.scrollHeight <
      window.sessionStorage.getItem(
        "scroll:" + storeData.router.location.pathname
      )
    ) {
      toScroll();
    } else {
      document.documentElement.scrollTop = window.sessionStorage.getItem(
        "scroll:" + storeData.router.location.pathname
      );
    }
  }, 200);
}

function googleAnalytics(routes) {
  handleChangePage({
    name: routes?.name,
    path: routes?.path,
  });
}

export function routesPathMaker(path, dynamic) {
  let formatPath = path;

  if (dynamic) {
    for (let key in dynamic) {
      formatPath = formatPath.replace(":" + key, dynamic[key]);
    }
  }

  return formatPath;
}
