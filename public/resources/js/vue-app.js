(function() {

    // define the router
    const router = new VueRouter({
        // uncomment next line for html5 routing
        // mode: 'history',

        routes: [
            // static routes
            { path: '/page-1', component: components.page1 },
            { path: '/page-2', component: components.page2 },

            // dynamic route (has parameters)
            { path: '/page-x/:x', component: components.pageX },

            // if path doesn't match anything then redirect
            { path: '*', redirect: '/page-1' }
        ]
    });

    // add the router to the app
    const app = new Vue({
        el: '#app',
        router: router
    });

})();