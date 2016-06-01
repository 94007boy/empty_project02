/**
 * Created by xiaolv on 16/5/30.
 */
var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {

    var post_data = {
        uid:'73126',
        siteid:'1',
        tab:'hot',
        pagesize:'30',
        device_type:'Android',
        versions:'2.0.5'
    };//这是需要提交的数据
    var content = qs.stringify(post_data);
    console.log('index:'+content);
    var options = {
        hostname: 'test.w.xtche.com',
        port: 80,
        path: '/port.php/Topic/getTopicIndex',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

    var req = http.request(options, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) {
                body += data;
            }).on('end', function () {
                var resdata = JSON.parse(body);
                //var data = res.Data;
                var datalist = resdata.Data.TopicThreadList;
                res.render('index', { title: '生活范',subtitleselected:'仙桃',subtitleunselected:'推荐',datalist:datalist});
                //res.send(200, datalist);
            });
        }else {
            res.send(500, "error");
        }
    });
    req.write(content + "\n");
    req.end();
});

module.exports = router;