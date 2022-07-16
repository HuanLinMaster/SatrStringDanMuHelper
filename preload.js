const fs = require("fs")
const path = require('path')
// const BrowserWindow = require('electron').remote.BrowserWindow
globalThis.config = JSON.parse(fs.readFileSync("config.json","utf-8"));
window.addEventListener('DOMContentLoaded', () => {
  console.log(config);
  document.getElementById("RoomIDInput").value = config.roomid;
  globalThis.ChangeRoomID = (id)=>{
    config.roomid = id;
    fs.writeFile('config.json',JSON.stringify(config,"null","\t"),function(err){
      console.log("成功保存");
    });
  }
  // document.getElementById('cookie_sub').addEventListener('click',function(){
  //   session.cookies.get({url:'https://www.bilibili.com'}).then(function(cookies,error){
  //     console.log(cookies);
  //   });
  // });
  document.getElementById('SettingConfirm').addEventListener('click',function(){
    ChangeRoomID(document.getElementById('RealRoomID').value);
  });
  // document.getElementById("CreateQueueWindows").addEventListener("click",()=>{
  //   newWin =new BrowserWindow({
  //       width:500,
  //       height:500,
  //       frame:true,//是否显示边缘框
  //       fullscreen:false //是否全屏显示
  //   })
  //   //打开一个新的窗口
  //   // newWin.loadURL(`file://${__dirname}/otherWin.html`);
  //   //新建窗口
  //   newWin.loadURL(`file://${__dirname}/queue.html`);
  //   newWin.on('close',()=>{
  //       newWin=null
  //   })
  // })
})