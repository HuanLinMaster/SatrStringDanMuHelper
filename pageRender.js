window.addEventListener('DOMContentLoaded', () => {
    $("#UserFace").html('<img src="http://i2.hdslb.com/bfs/face/0fbf0e84ca7e89ad3c352754da5431d64d271964.jpg" style="width:100%;border-radius: 50px;">')
    $("#UserName").html("多玩幻灵qwq");

});
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }
    var data = arguments;		//如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        //如果模板参数是对象
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replace("{" + key + "}", value);
        } 
    }
    return result;
}
const GetFace = (uid) => {
    const url = "http://api.bilibili.com/x/space/acc/info?mid={uid}".format({
        uid: uid
    });
    var FaceURL = "http://i2.hdslb.com/bfs/face/0fbf0e84ca7e89ad3c352754da5431d64d271964.jpg";//返回值
    $.ajax({
        url:url,
        async:false
    })
    .then((data)=>{
        FaceURL = data.data.face;
    });
    return FaceURL;
};