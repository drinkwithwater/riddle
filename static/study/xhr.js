
    var dosth=function(url) {
        //ÆÕÍ¨ÉÏ´«
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            var formData, startDate;
/*            formData = new FormData();
            formData.append('token', token);
            formData.append('file', f);*/

            xhr.onreadystatechange = function(response) {
                if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
                    var blkRet = JSON.parse(xhr.responseText);
			console.log(xhr.reqponseText);
                } else if (xhr.status != 200 && xhr.responseText) {
			console.log("error");
                }
            };
            xhr.send();
    };
