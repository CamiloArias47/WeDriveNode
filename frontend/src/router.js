import VueRouter from "vue-router";
import routes from "./routes/routes";
import { store } from "./store";

// coonfiguracion del router
const router = new VueRouter({
    mode: 'history',
    routes, // short for routes: routes
    linkExactActiveClass: "nav-item active"
  });
  
  router.beforeEach((to, from, next) => {
    let requiresAuth = to.matched.some(record => record.meta.userLoged),
        //welcomePage = to.matched.some( record => record.meta.welcomePage),
        requiresVisitor = to.matched.some(record =>record.meta.requiresVisitor)
        //adminPage = to.matched.some( record => record.meta.admin);
    if(requiresAuth){
        if(!store.getters.loggedIn){
            next({
                name: 'Login'
            });
        }else{
            next();
        }
    }else if(requiresVisitor){
        if(store.getters.loggedIn){
            next('/app/maps');
        }else{
            next();
        }
    }else{
        next();
    }
  })

  export default router