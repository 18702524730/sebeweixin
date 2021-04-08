module.exports = {
  /**
   * 初始化调用此方法
   * 
   */
  initShare() {
    var self = this;
    var context = wx.createCanvasContext();
    var path = "images/share1.jpg";
    context.drawImage(path, 0, 0, 680, 1000);
    wx.getSavedFileList({
      success: function (res) {
        console.log("len:" + res.fileList.length)
        if (res.fileList.length > 0) {
          for (var i = 0; i < res.fileList.length; i++) {
            wx.removeSavedFile({
              filePath: res.fileList[i].filePath,
              complete: function (res) {
              }
            })
          }
        }
      }
    })
    wx.getUserInfo({
      success: function (res) {
        self.downImg({
          url: res.userInfo.avatarUrl,
          fun(down) {
            context.drawImage(down.tempFilePath, 300, 750, 100, 100);
            context.setFontSize(20);
            context.setFillStyle("red");
            context.save();
            context.translate(300, 880);
            context.fillText(res.userInfo.nickName, 0, 0);
            context.restore();
            context.stroke();
          }
        })
      }
    })
    wx.request({
      url: tUrl,
      data: {
        t: 'Wxacode',
        rdsession: user.getRdsession(),
        path: 'path/index/index'
      },
      success: (res) => {
        imgUrl = res.data.content.path;
        self.downImg({
          url: res.data.content.path,
          fun(down) {
            context.drawImage(down.tempFilePath, 140, 830, 130, 130);
          }
        })
      },
      complete: () => {
      }
    })
    var yq = "邀请你一起来敲锣打鼓";
    var ewm = "长按二维码，擂鼓助威";
    context.setFontSize(24);
    context.setFillStyle("red");
    context.fillText(yq, 300, 910);
    context.fillText(ewm, 300, 940);
    context.stroke();
    var path = "images/logo.png";
    context.drawImage(path, 500, 20, 180, 66.4);
    
    setTimeout(() => {
      wx.drawCanvas({
        canvasId: "mycanvas",
        actions: context.getActions()
      });
    }, 3000)
  },
  downImg(obj) {
    wx.downloadFile({
      url: obj.url,
      success: obj.fun
    })
  },
  /**
   * 
   * 点击生成卡片调用此方法
   * 
   */
  canavsToImg() {
    var self = this;
    wx.getSavedFileList({
      success(list) {
       
        var len = list.fileList.length;
        if(len>0){
          var path = list.fileList[0].filePath;
          wx.previewImage({
            urls: [path]
          })
        }else{
          self.hasFileTem();
        }
      }
    })         
  },
  hasFileTem(){
    var self = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var version = res.version.split('.')[2];
        console.log(version)
        if ((res.platform == "ios" && version < 16) || (res.platform == "android" && version < 16) ) {
          wx.previewImage({
            urls: [imgUrl]
          })
        } else {
          self.pre();
        }
      }
    })
  },
  pre(){
    setTimeout(function () {
      wx.hideLoading()
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success(res) {
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success(save) {
              wx.getSavedFileList({
                success(list) {
                  list = list.fileList[0].filePath;
                  wx.previewImage({
                    urls: [list]
                  })
                }
              })
            }
          });
        }
      });
    }, 2000)  
  }
}