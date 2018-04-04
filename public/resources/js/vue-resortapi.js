if (!window.components) window.components = {};

components.pageX = {
    // template displays x value
    template: `<div><h1>{{x}}</h1></div>`,

    // this is to handle updates to this component when 
    // the route changes but the component does not
    beforeRouteUpdate(to, from, next) {
        this.x = to.params.x;
        next();
    },
    data: function () {
        return {
            // set x to the route param value
            x: this.$route.params.x
        }
    }
};


components.home = {
    template: `<div><h1>HOME!</h1></div>`
};