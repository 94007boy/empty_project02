/**
 * Created by xiaolv on 16/5/23.
 */
$(function(e){

    $(window).scroll(function (){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
            $(this).getMore();
        }
    });

    $(document).on("click",".com-footer-nav > a",function(){
        var index = $(this).index();
        var img = $(this).children("img");
        switch (index){
            case 0:
                img.attr('src','images/index_icon_pre.png');
                $(".com-footer-nav a:nth-child(2)").children("img").attr('src','images/topic_icon_nor.png');
                $(".com-footer-nav a:nth-child(3)").children("img").attr('src','images/msg_icon_nor.png');
                $(".com-footer-nav a:nth-child(4)").children("img").attr('src','images/discover_topic_nor.png');
                break;
            case 1:
                $(".com-footer-nav a:nth-child(1)").children("img").attr('src','images/index_icon_nor.png');
                img.attr('src','images/topic_icon_pre.png');
                $(".com-footer-nav a:nth-child(3)").children("img").attr('src','images/msg_icon_nor.png');
                $(".com-footer-nav a:nth-child(4)").children("img").attr('src','images/discover_topic_nor.png');
                break;
            case 2:
                $(".com-footer-nav a:nth-child(1)").children("img").attr('src','images/index_icon_nor.png');
                $(".com-footer-nav a:nth-child(2)").children("img").attr('src','images/topic_icon_nor.png');
                img.attr('src','images/msg_icon_pre.png');
                $(".com-footer-nav a:nth-child(4)").children("img").attr('src','images/discover_topic_nor.png');
                break;
            case 3:
                $(".com-footer-nav a:nth-child(1)").children("img").attr('src','images/index_icon_nor.png');
                $(".com-footer-nav a:nth-child(2)").children("img").attr('src','images/topic_icon_nor.png');
                $(".com-footer-nav a:nth-child(3)").children("img").attr('src','images/msg_icon_nor.png');
                img.attr('src','images/discover_topic_pre.png');
                break;
        }
    })

    $(document).on("click",".tilte-tab > a",function(){
        $(this).parent().children('.selected').removeClass('selected');
        $(this).addClass('selected');
        var index = $(this).index();
    })

    $.fn.getMore = function() {
        function ajax() {
            console.log("发出的时间:"+(localStorage.getItem('timestamp') === 'undefined'?'':localStorage.getItem('timestamp')));
            $.post('http://localhost:3000/getmore',{
                uid:'73126',
                siteid:'1',
                tab:'hot',
                pagesize:'30',
                device_type:'Android',
                timestamp:(localStorage.getItem('timestamp') === 'undefined'?'':localStorage.getItem('timestamp')),
                versions:'2.0.5'
            }, function(body){
                //console.log("ajax:"+body.Data.TopicThreadList.length);
                $(".topic-list-loading-more").remove();
                var datalist = body.Data.TopicThreadList;
                $.each(datalist, function(i, data){
                    var listviewitem = '';
                    listviewitem += '<div class="topic-item-container">';
                    listviewitem += '<div class="item-title-container">';
                    listviewitem += '<a href="#"><img src="'+ data.uavatar +'"/>'+'</a>';
                    listviewitem += '<div class="item-title-name">';
                    listviewitem += '<a href="#">'+ data.unickname +'</a><img src="' +data.UserGroup.sgimg +'"/>';
                    listviewitem += '</div>';
                    listviewitem += '<p>我是'+data.UserGroup.gname +'</p>';
                    listviewitem += '<a href="#"><img src="images/icon_person_focus_no.png"/></a>';
                    listviewitem += '</div>';
                    listviewitem += '<div class="item-content-container">';
                    if(datalist[i].Attachment.length !== 0) {
                        listviewitem += '<img class="topic-item-attach" src="'+data.Attachment[0].url +'"/>';
                    }
                    listviewitem += '<p><a href="#">#'+ data.topic.title +'#</a>'+ data.content+ '</p>';
                    listviewitem += '<div class="topic-item-bottom-icon">';
                    listviewitem += '<a><img src="images/topic_praise2_unlike.png"/>'+ data.praise +'</a><a><img src="images/icon_topic_replay.png"/>'+data.replies +'</a>';
                    listviewitem += '</div>';
                    listviewitem += '</div>';
                    listviewitem += '</div>';
                    $(".topic-list-view").append(listviewitem);
                    if(i === (datalist.length - 1)){
                        localStorage.setItem('timestamp',data.addtime)
                        console.log("存最后一个时间戳："+data.addtime);
                    }
                });
                var loading = '';
                loading+='<div class="topic-list-loading-more">';
                loading+='<img src="images/loading_more.gif"/><a>加载中...</a>';
                loading+='</div>';
                $(".topic-list-view").append(loading);
            }, "json");
        }
        ajax();
        return $(this);
    };
})