window.httpRequest = (function () {

    function getJSON(url, headers){
        var promise = new RSVP.Promise(function(resolve, reject){
            $.ajax({
                url:url,
                type:"GET",
                dataType: "json",
                headers: headers || {},
                contentType:"application/json",
                timeout:5000,
                success:function(data){
                    resolve(data);
                },
                error:function(err){
                    reject(err);
                }
            });
        });

        return promise;
    }

    function postJSON(url, requestData, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "POST",
                headers: headers || {},
                data: requestData,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });

        return promise;
    }
    
    return {
        getJSON: getJSON,
        postJSON: postJSON
    };
}());