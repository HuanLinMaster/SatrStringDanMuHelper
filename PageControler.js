window.addEventListener('DOMContentLoaded', () => {
    var Drawer = new mdui.Drawer('#drawer');
    $('#OpenDrawer').on('click', function () {
         Drawer.open();
    });
    $('#RoomIDInput').on('blur', function () {
        var roomid;
        if($("#RoomIDInput").val() == ""){
            mdui.snackbar({
                message: '房间号未填写~',
            });
            return;
        }
        if(!isNaN(Number($("#RoomIDInput").val()))){
            roomid = $("#RoomIDInput").val();
        } else {
            var arrUrl = $("#RoomIDInput").val().split("//");
    
            var start = arrUrl[1].indexOf("/");
            var relUrl = arrUrl[1].substring(start);
            roomid = relUrl.indexOf("?") != -1?relUrl.split("?")[0]:relUrl.replace("/","");
            roomid = roomid.replace("/","")
        }
        // console.log(relUrl);
        $("#RoomIDInput").val(roomid);
        
        var url = "http://api.live.bilibili.com/room/v1/Room/room_init?id={roomid}".format({
            roomid: roomid
        });
        $.ajax({
            url:url,
            async:false
        })
        .then((data)=>{
            if(data.code == 60004) {
                mdui.snackbar({
                    message: '房间号解析失败~{reason}'.format({
                        reason:data.msg
                    }),
                });
            } else {
                mdui.snackbar({
                    message: '真实房间号{roomid}解析成功~'.format({
                        roomid:data.data.room_id
                    }),
                });
                $("#RealRoomID").val(data.data.room_id)
                $("#RoomIDInput").val(data.data.room_id)
            };
        });
        // ws.close();
        // timer = null;
        // ChangeRoomID($("#RoomIDInput").val());
    });
    document.getElementById('SettingConfirm').addEventListener('click',function(){//别问为什么夹着DOM，都怪electron
        // ChangeRoomID(document.getElementById('RealRoomID').value);
        mdui.snackbar({
          message: '保存成功~马上为您刷新界面',
          onClose: function(){
            location.reload();
          }
        });
    });
    
    $("#CreateQueueWindows").click(()=>{
        QueueWindow = window.open("queue.html")
    })
    $("#DeleteQueue").click(()=>{
        let sendString = '<select class="mdui-select" mdui-select id="RemoveSelect">';
        for(key in queue) {
            sendString += '<option value="'+queue[key]+'">'+queue[key]+'</option>'
        }
        sendString += "</select>"
        // mdui.alert("请选择将谁移除队列<br>"+sendString, ()=>{})
        mdui.dialog({
            content:"请选择将谁移除队列<br>"+sendString,
            buttons: [
                {
                    text: '确认',
                    onClick: function () {
                        // console.log($("#RemoveSelect").text());
                        QueueWindow.postMessage("delete "+$("#RemoveSelect").text())
                    //   mdui.alert('点击确认按钮的回调');
                    }
                  }
            ]
        })
        QueueWindow.postMessage("add "+element.info[2][1])
    })
});