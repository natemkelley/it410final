if (!window.components) window.components = {};

components.home = {
    // template displays x value
    template: 
`

    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1">
                <form class="form-group">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <h3>Ski Resort: </h3>
                            <input placeholder="Example: Park City" type="text" id="resortField" value="" class="form-control">
                            <h3>Ski Region: </h3>
                            <input placeholder="Example: Utah" type="text" id="regionField" value="" class="form-control">
                            <br>


                            <p><strong id="strong">Suggestion:</strong> <span id="txtHint">Empty</span>



                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>


`,

    
    data: function () {
        return {
            // set x to the route param value
            x: "home"
        }
    }
};

