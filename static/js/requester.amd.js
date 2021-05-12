/**
 * 基于jquery的请求处理封装模块
 *
 * 依赖jquery和layers
 */
define(['jquery', 'layers'], function () {
    var Requester = {
        delayTime: 0,//延迟多久发送请求
        loadingType: 0,//正在加载动画类型,-1不显示
        loadingTip: '数据加载中...',//正在加载提示文字
        loadingLayer: '',//加载层
        beforeCallback: function () {//请求发送前回调，一般用于显示loading
        },
        delay: function (delayTime) {//延迟执行
            if (undefined === delayTime) {
                delayTime = 0;
            }
            this.delayTime = parseInt(delayTime);
            return this;
        },
        //设置发送前回调
        before: function (callbackFunction) {
            if ('function' === typeof callbackFunction) {//是否自定义发送前处理回调
                this.beforeCallback = callbackFunction;
            }
            return this;
        },
        //设置加载动画
        loading: function (no, tip) {
            //如果直接传入加载文字
            if ('string' === typeof(no)) {
                this.loadingType = 0;
                this.loadingTip = no;
            } else {
                this.loadingType = undefined !== no ? no : 0;
                this.loadingTip = undefined !== tip ? tip : '数据加载中...';
            }

            return this;
        },
        //设置加载动画
        showLoading: function () {
            var self = this;
            switch (this.loadingType) {
                case -1://不显示加载层
                    break;
                case 0://msg带文字层loading,参数二为提示文字
                    var tip = undefined !== self.loadingTip ? self.loadingTip : '加载中...';
                    self.loadingLayer = layer.msg(tip, {
                        icon: 16,
                        shade: 0.3,
                        time: 0,
                    });
                    break;
                case 1://默认的加载动画一，左右滚动
                    self.loadingLayer = layer.load();
                    break;
                case 2://默认加载动画2，转圈
                    self.loadingLayer = layer.load(1);
                    break;
                case 3://摩恩加载动画3，转圈
                    self.loadingLayer = layer.load(2);
                    break;
            }
        },
        //post的形式发送数据
        post: function (url, data, successCallback, failCallback) {
            //判断有没有传请求数据
            if ('function' == typeof arguments[1]) {//没传数据则交换参数
                failCallback = successCallback;
                successCallback = data;
                data = {};
            }
            //组装数据
            var req = {
                type: 'post',
                url: url,
                data: data,
                successCallback: successCallback,
                failCallback: failCallback
            };
            this.request(req);//执行请求
        },
        //get方式获取数据
        get: function (url, successCallback, failCallback) {
            //组装数据
            var req = {
                type: 'get',
                url: url,
                successCallback: successCallback,
                failCallback: failCallback
            };
            this.request(req);
        },
        //通过Ajax函数发送请求
        request: function (req) {
            var self = this;
            setTimeout(function () {
                //发送请求
                $.ajax({
                    type: req.type,
                    url: req.url,
                    data: req.data,
                    cache: false,
                    dataType: "json",
                    //请求成功
                    success: function (ret) {
                        layer.close(self.loadingLayer);//关闭弹层

                        //判断是不是登录超时
                        if (3 === ret.status) {
                            layer.msg("登录超时，请新开页面登陆后重试", {icon: 5});//默认直接显示错误消息
                            return false;
                        }

                        //判断请求结果是否已经成功
                        if (1 !== ret.status) {
                            if ('function' === typeof req.failCallback) {//是否自定义处理失败事件
                                req.failCallback(ret.error, ret);
                            } else {
                                layer.msg(ret.error, {icon: 5});//默认直接显示错误消息
                            }
                            return false;
                        }

                        //成功，执行成功回调
                        if ('function' === typeof req.successCallback) {
                            req.successCallback(ret.data);
                        } else {
                            layer.msg('处理成功', {icon: 6});
                        }
                    },
                    //发送请求前
                    beforeSend: function () {
                        //加载loading层
                        self.showLoading();

                        //发送前回调，默认启用loading
                        self.beforeCallback();
                    },
                    //请求完成
                    complete: function () {
                        //重置默认值
                        self.loadingType = 0;
                        self.loadingTip = '数据加载中...';
                        self.delayTime = 0;
                        self.beforeCallback = function () {
                        };
                    },
                    //请求错误
                    error: function (event) {
                        layer.close(self.loadingLayer);//关闭弹层

                        var errorMsg = '数据接口错误[' + event.status + "]";
                        //接口错误上报,略。。。
                        layer.msg(errorMsg, {icon: 2});
                    }
                });
            }, this.delayTime);//延迟执行
        },
    };

    //返回
    return Requester;
});
