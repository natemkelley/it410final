if (!window.components) window.components = {};

components.home = {
    template: `<div class="container">
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

                            
                            <table style='width: 100%; max-width:1000px;'>
                                <colgroup><col style='width: 40%;'><col style='width: 25%;'><col style='width: 35%;'></colgroup>
                                <tr><th>Name</th><th>Region</th><th>Official Website</th></tr>
                                
                                <tr>
                                    <td><a {{ROUTER TO ID}}>{{NAME}</a> </td>
                                    <td> {{REGION}}</td>
                                    <td> {{OFFICIAL SITE}}</td>

                                </tr>
                                
                            </table>


                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>`
};