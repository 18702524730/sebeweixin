import wepy from 'wepy'
import interfaces from '../interfaces'

module.exports = {
  /**
   * 初始化调用此方法
   *
   */
  initShare(id, callback) {
  	let bgPath = '/images/placeUrl/card_bg.jpg';
  	let text = 'sfsfsfsf'
  	console.log(bgPath)
    var self = this;

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

    wx.getSystemInfo({
	    //获取系统信息成功，将系统窗口的宽高赋给页面的宽高
	    success: function (res) {
	    	// console.log(res)
	    	var context = wx.createCanvasContext("mycanvas");
    		context.drawImage(bgPath, 0, 0, res.windowWidth, res.windowWidth);
    		context.setFontSize(14);
		    context.setFillStyle("#2F80F6");
		    context.save();
		    // context.translate(86, 360);//必须先将旋转原点平移到文字位置
		    context.translate(res.windowWidth * 165/750, res.windowWidth * 630/750);
		    context.fillText('请长按识别二维码，确认订单信息', 0, 0);//必须为（0,0）原点
		    context.restore();
		    context.stroke();

	    	const url = `${wepy.$instance.globalData.wxUrl}/weixin/miniApp/createwxaqrcode.do`;
    		wx.request({
		      url,
		      method: 'POST',
		      header: interfaces.createAuthHeader(),
		      data: {
		      	// miniAppSessionId: wepy.getStorageSync('sessionId'),
		      	miniAppType: 2, // 2为拾贝微商城 3为推单助手wepy.$instance.globalData.miniAppType,
		      	qrcodeType: 2, // 1接口A,2 接口B,3 接口C 接口ABC的参数必传其一
		      	scene: id,
		      	path: "pages/confirm/confirm", // 2接口B不能带参数，需传scene。接口A和接口C需要带参数
		      	width: 430,
		      	auto_color: false,
		      	line_color: {"r":"47","g":"128","b":"246"}
		    	},
		    	success(re){
						self.downImg({
		          url: re.data.imageurl,
		          fun(down) {
	            	context.drawImage(down.tempFilePath, res.windowWidth * 145/750, res.windowWidth * 145/750, res.windowWidth * 460/750, res.windowWidth * 460/750);
					      wx.drawCanvas({
					        canvasId: "mycanvas",
					        actions: context.getActions()
					      });
					      callback && callback(re.data.imageurl);
		          }
		        })
		    	},
		    	fail(err){
		    	}
		    });
	    }
		})
  },
  // 下载头像
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
    // 获取本地已保存的文件列表
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
        var checkVer = function(){
        	var ret = true;
	        var version0 = res.version.split('.')[0];
	        var version1 = res.version.split('.')[1];
	        var version2 = res.version.split('.')[2];
	        if (version0 < 6) {
	        	ret = false;
	        }else if(version0 == 6){
	        	if (version1 < 5) {
	        		ret = false;
	        	}else if(version1 == 5 && version2<16){
	        		ret = false;
	        	}
	        }
	        return ret;
        }
        console.log(res.version)
        // canvas转换为图片会遇到兼容性问题，我遇到的是背景图在ios系统中，微信 6.5.16 以下的版本都不兼容。安卓是 .16以下的版本也不兼容背景图。
        if ((res.platform == "ios" && !checkVer()) || (res.platform == "android" && !checkVer()) ) {
          /*wx.previewImage({
            urls: [imgUrl]
          })*/
        } else {
        	console.log('ok')
          self.pre();
        }
      }
    })
  },
  pre(){
    wx.hideLoading()
    // 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success(res) {
      	console.log(res.tempFilePath);
      	// 保存文件到本地
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success(resp) {
          	/*wx.saveImageToPhotosAlbum({
          		filePath: resp.savedFilePath,
          		success(){

          		}
          	});*/
            wx.getSavedFileList({
              success(list) {
                list = list.fileList[0].filePath;
                // 预览图片
                wx.previewImage({
                  urls: [list]
                })
              }
            })
          }
        });
      }
    });
  }
}
