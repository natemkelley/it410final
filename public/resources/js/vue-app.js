(function() {

    // define the router
    const router = new VueRouter({
        // uncomment next line for html5 routing
        //mode: 'history',

        routes: [
            // static routes
            { path: '/', component: components.home },

            // dynamic route (has parameters)
            { path: '/resort/:x', component: components.pageX },

            // if path doesn't match anything then redirect
            { path: '*', redirect: '/' }
        ]
    });

    // add the router to the app
    const app = new Vue({
        el: '#app',
        router: router
    });

})();