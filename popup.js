// 变量定义
var getThisVideo = $('#getThisVideo'),
    videoIdInput = $('#videoIdInput');



// 初始化（激活当前标签）
chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      var url = tabs[0].url;
      alert(url)
      // 检查是否是YouTube播放页?
      if(url.substring(0, 29) !== 'https://www.youtube.com/watch'){
          console.log('不是youtube');
          videoIdInput.replaceWith("<b style='color: #e33331;'>仅供采集YouTube播放页</b>");
          getThisVideo.remove();
          return false;
      }

      // 获取当前的videoID
      var videoId = url.substring(32, 32 + 11);
      //  input 赋值
      videoIdInput.val(videoId);
      alert(videoId)

      // 监听采集事件
      getThisVideo.unbind('click').bind('click', function(){
          // 移除提交按钮
          getThisVideo.remove();
          // 发送数据
          var jsonData = {videoId : videoId}

          // 发送请求
          $.ajax({

                url  : 'http://test.com/GooglePlug.php?videoId=' + videoId,
				
                dataType : 'json',
                success : function(result){
                  var str = JSON.stringify(result);
                    alert(str);
                    if(result.status != 1){// 失败
                      videoIdInput.replaceWith("<b style='color: #e33331;'>"+result.msg+"</b>");
                    }else{// 成功
                      videoIdInput.replaceWith("<b style='color: #3c763d; font-size:1.2em;'>采集成功 : )</b>");
                    }
                },
                error : function(){
                    videoIdInput.replaceWith("<b style='color: #e33331;'>抓取错误，请刷新重试</b>");
                }
          });
          return false;
      });
   }
);