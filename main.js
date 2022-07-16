const { app, BrowserWindow,Menu } = require('electron')
// const electron = require('electron')
const path = require('path')

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;
const DEBUG = false;


// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function() {
  // 创建浏览器窗口。
  if(!DEBUG) Menu.setApplicationMenu(null);
  mainWindow = new BrowserWindow({
    width: 360,
    height: 640,
    webPreferences:{
      webviewTag: true, //开启webview支持
      nodeIntegration: true, //开启渲染页面的node环境
      preload: path.join(__dirname, 'preload.js')
    },
    frame: false,
    // transparent: true,
    resizable: false
  });
  if(DEBUG) mainWindow.openDevTools();
  // console.log("a");
  // 加载应用的 index.html
  // mainWindow.loadURL('https://chat.loliloli.moe/room/24717052?minGiftPrice=0&minTickerPrice=0.1&showDanmaku=true&showTranslateDanmakuOnly=false&translationSign=%E3%80%90&showSuperchat=true&showNewMember=true&showGift=true&showGiftInfo=true&mergeSimilarDanmaku=false&mergeGift=false&danmakuAtBottom=false&tickerAtButtom=false&maxNumber=30&fadeOutNum=3&pinTime=0&imageShowType=2&maxImage=2&blockGiftDanmaku=true&blockLevel=0&blockNewbie=false&blockNotMobileVerified=false&blockKeywords=&blockUsers=&blockMedalLevel=0&minDanmakuInterval=400&maxDanmakuInterval=1200&relayMessagesByServer=false&autoTranslate=false&giftUsernamePronunciation=');
  mainWindow.loadFile("index.html")
  // 打开开发工具
  // console.log("aa");
  // mainWindow.setAlwaysOnTop(true)

  // 当 window 被关闭，这个事件会被触发
  mainWindow.on('closed', function() {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    mainWindow = null;
  });
});