import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, removeToken } from "@/utils/auth"; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist without logined status

// router guard，every request goes through here first
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // determine whether the user has logined in
  const hasToken = getToken();
  if (hasToken) {
    // logined status, accessing login page redirect to the home page
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
      return;
    }

    // determine whether the user has obtained his permission roles
    const hasRoles = store.getters.roles && store.getters.roles.length > 0;
    if (hasRoles) {
      // has roles，direct release
      next();
      return;
    }

    // no roles
    try {
      // get user info
      const { id } = await store.dispatch("user/getInfo");

      // generate accessible routes map
      const accessRoutes = await store.dispatch("permission/generateRoutes", id);

      // dynamically add accessible routes
      for (const route of accessRoutes) {
        router.addRoute(route);
      }

      next({ ...to, replace: true });
    } catch (error) {
      console.error(error);
      Message.error(error.message || "Has Error");
      // remove token and go to login page to re-login
      await store.dispatch("user/logOut");
      removeToken();
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  } else {
    /* has no token，not logined status */
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
