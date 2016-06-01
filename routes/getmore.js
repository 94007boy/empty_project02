/**
 * Created by xiaolv on 16/5/30.
 */
var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require('http');


exports.more = function(req, res){
    //console.log('uid='+req.param('uid'));
    //console.log('siteid='+req.param('siteid'));
    //console.log('tab='+req.param('tab'));

    console.log("收到的时间戳:"+(req.body.timestamp === 'undefined'?'':req.body.timestamp));
    var post_data = {
        uid:req.body.uid,
        siteid:req.body.siteid,
        tab:req.body.tab,
        pagesize:req.body.pagesize,
        device_type:req.body.device_type,
        timestamp:(req.body.timestamp === 'undefined'?'':req.body.timestamp),
        versions:req.body.versions
    };//这是需要提交的数据
    var content = qs.stringify(post_data);
    console.log('getmore:'+content);
    var options = {
        hostname: 'test.w.xtche.com',
        port: 80,
        path: '/port.php/Topic/getTopicIndex',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

    var mreq = http.request(options, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) {
                body += data;
            }).on('end', function () {
                console.log('更多数据：body = '+body);
                //var resdata = JSON.parse(body);
                ////var data = res.Data;
                //var datalist = resdata.Data.TopicThreadList;
                //console.log("发："+body);
                res.status(200).send(body);
            });
        }else {
            res.send(500, "error");
        }
    });
    mreq.write(content + "\n");
    mreq.end();
};
