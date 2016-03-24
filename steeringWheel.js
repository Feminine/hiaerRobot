define(function() {
    var steeringWheel = function(config) {
        this.w;
        this.a;
        this.s;
        this.d;
        this.m;
        this.dom;
        var Data = config.data;
        var OnOff_Start = Data.OnOff_Start;
        var OnOff_Direction_Forward = Data.OnOff_Direction_Forward;
        var OnOff_Direction_Left = Data.OnOff_Direction_Left;
        var OnOff_Direction_Backward = Data.OnOff_Direction_Backward;
        var OnOff_Direction_Right = Data.OnOff_Direction_Right;
        steeringWheel.prototype.init = function(config) {
            var self = this;
            var hook = $(config.hook);

            self.dom = hook.html(
                '<div class="center-color" >' +
                '    <div class="panel-switches">' +
                '        <switch class="uI-switch-wrap bind_handle_OnOff_Start steering-wheel-btn switch-start switch-off"></switch>' +
                '    </div>' +
                '</div>' +
                '<div class="panel-switches">' +
                '    <switch class="uI-switch-wrap bind_handle_Forward switch-forward switches-item switch-off"></switch>' +
                '    <switch class="uI-switch-wrap bind_handle_Left switch-left switches-item switch-off"></switch>' +
                '    <switch class="uI-switch-wrap bind_handle_Backward switch-back switches-item switch-off"></switch>' +
                '    <switch class="uI-switch-wrap bind_handle_Right switch-right switches-item switch-off"></switch>' +
                '</div>'
            );
            hook.addClass('steering-wheel');

            self.m = config.start_off && new DA.Switch('OnOff_Start', {
                datamodel: {
                    text: '开关',
                    key: OnOff_Start,
                    value: "0",
                    map: {
                        on: "1",
                        off: "0"
                    }
                },
                tpl: '<div class="uI-switch ui-switch-off" data-key="OnOff_Start"><i class="iconfont1 switch_start">&#xe7a1;</i>' + '<i class="iconfont1 switch_stop">&#xe68d;</i></div>',
                domhook: $('.bind_handle_OnOff_Start'),
                onClickBefore: function() {
                    return true;
                },
                onClickAfter: function() {
                    return true;
                },
                changed: function() {
                    var m = {};
                    m[OnOff_Start] = {
                        'value': '1'
                    };
                    var M = {};
                    M[OnOff_Start] = {
                        'value': '0'
                    }
                    if ($('.bind_handle_OnOff_Start').hasClass('switch-off')) {
                        DA.setDeviceStatus(DA.uuid, M);
                    } else {
                        DA.setDeviceStatus(DA.uuid, m);
                    }
                }
            });
            self.w = new DA.Switch('OnOff_Direction_ForwardSwith', {
                datamodel: {
                    key: OnOff_Direction_Forward,
                    value: "0",
                    map: {
                        on: "1",
                        off: "0"
                    },
                    icon: "&#xe629;"
                },
                tpl: '<div class="uI-switch" data-key="OnOff_Direction_Forward"><a href="#"><i class="iconfont">&#xe60c;</i></a>' + '<span class="switch-desc">向前</span></div>',
                domhook: $('.bind_handle_Forward'),
                onClickBefore: function() {
                    return true;
                },
                onClickAfter: function() {},
                changed: function() {
                    var w = {};
                    w[OnOff_Direction_Forward] = {
                        'value': '1'
                    };
                    var W = {};
                    W[OnOff_Direction_Forward] = {
                        'value': '0'
                    }
                    if ($('.bind_handle_Forward').hasClass('switch-off')) {
                        DA.setDeviceStatus(DA.uuid, w);
                    } else {
                        DA.setDeviceStatus(DA.uuid, W);
                    }
                    // this.setDeviceStatus();
                }
            });
            self.a = new DA.Switch('OnOff_Direction_LeftSwith', {
                datamodel: {
                    key: OnOff_Direction_Left,
                    value: "0",
                    map: {
                        on: "3",
                        off: "0"
                    },
                    icon: "&#xe614;"
                },
                tpl: '<div class="uI-switch" data-key="OnOff_Direction_Left"><a href="#"><i class="iconfont">&#xe614;</i></a>' + '<span class="switch-desc">逆时针</span></div>',
                domhook: $('.bind_handle_Left'),
                onClickBefore: function() {
                    return true;
                },
                onClickAfter: function() {},
                changed: function() {
                    var a = {};
                    a[OnOff_Direction_Left] = {
                        'value': '3'
                    };
                    var A = {};
                    A[OnOff_Direction_Left] = {
                        'value': '0'
                    }
                    if ($('.bind_handle_Left').hasClass('switch-off')) {
                        DA.setDeviceStatus(DA.uuid, a);
                    } else {
                        DA.setDeviceStatus(DA.uuid, A);
                    }
                    // this.setDeviceStatus();
                }
            });
            self.s = new DA.Switch('OnOff_Direction_BackwardSwith', {
                datamodel: {
                    key: OnOff_Direction_Backward,
                    value: "0",
                    map: {
                        on: "2",
                        off: "0"
                    },
                    icon: "&#xe629;"
                },
                tpl: '<div class="uI-switch" data-key="OnOff_Direction_Backward"><span class="switch-desc">向后</span>' + '<a href="#"><i class="iconfont">&#xe60d;</i></a></div>',
                domhook: $('.bind_handle_Backward'),
                onClickBefore: function() {
                    return true;
                },
                onClickAfter: function() {},
                changed: function() {
                    var s = {};
                    s[OnOff_Direction_Backward] = {
                        'value': '2'
                    };
                    var S = {};
                    S[OnOff_Direction_Backward] = {
                        'value': '0'
                    }
                    if ($('.bind_handle_Backward').hasClass('switch-off')) {
                        DA.setDeviceStatus(DA.uuid, s);
                    } else {
                        DA.setDeviceStatus(DA.uuid, S);
                    }
                    // this.setDeviceStatus();
                }
            });
            self.d = new DA.Switch('OnOff_Direction_RightSwith', {
                datamodel: {
                    key: OnOff_Direction_Right,
                    value: "0",
                    map: {
                        on: "4",
                        off: "0"
                    },
                    icon: "&#xe613;"
                },
                tpl: '<div class="uI-switch" data-key="OnOff_Direction_Right"><a href="#"><i class="iconfont">&#xe613;</i></a>' + '<span class="switch-desc">顺时针</span></div>',
                domhook: $('.bind_handle_Right'),
                onClickBefore: function() {
                    return true;
                },
                onClickAfter: function() {},
                changed: function() {
                    var d = {};
                    d[OnOff_Direction_Right] = {
                        'value': '4'
                    };
                    var D = {};
                    D[OnOff_Direction_Right] = {
                        'value': '0'
                    }
                    if ($('.bind_handle_Right').hasClass('switch-off')) {
                        DA.setDeviceStatus(DA.uuid, d);
                    } else {
                        DA.setDeviceStatus(DA.uuid, D);
                    }
                    // this.setDeviceStatus();
                }
            });
        };
        steeringWheel.prototype.OnOff_Start = function(config) {
            var steer = $('.steering-wheel'),
                onOff_Start = $('.bind_handle_OnOff_Start'),
                Forward = $('.bind_handle_Forward'),
                Backward = $('.bind_handle_Backward'),
                Left = $('.bind_handle_Left'),
                Right = $('.bind_handle_Right');

            if (config.Data[OnOff_Start] && config.Data[OnOff_Start].value == '0') {
                onOff_Start.addClass('switch-on').removeClass('switch-off');
            } else {
                steer.removeClass('Direction_Forward Direction_Left Direction_Right Direction_Backward');
                onOff_Start.removeClass('switch-on').addClass('switch-off');
                Forward.removeClass('switch-on').addClass('switch-off');
                Backward.removeClass('switch-on').addClass('switch-off');
                Left.removeClass('switch-on').addClass('switch-off');
                Right.removeClass('switch-on').addClass('switch-off');               
            }

            if (config.Data[OnOff_Direction_Forward].value == '0') {
                Forward.removeClass('switch-on').addClass('switch-off');
                steer.removeClass('Direction_Forward');
            } else if(config.Data[OnOff_Direction_Forward].value == '1') {
                Forward.addClass('switch-on').removeClass('switch-off');
                steer.addClass('Direction_Forward');
            }

            if (config.Data[OnOff_Direction_Backward].value == '0') {
                Backward.removeClass('switch-on').addClass('switch-off');
                steer.removeClass('Direction_Backward');
            } else if(config.Data[OnOff_Direction_Backward].value == '2') {
                Backward.addClass('switch-on').removeClass('switch-off');
                steer.addClass('Direction_Backward');
            }

            if (config.Data[OnOff_Direction_Left].value == '0') {
                Left.removeClass('switch-on').addClass('switch-off');
                steer.removeClass('Direction_Left');
            } else if(config.Data[OnOff_Direction_Left].value == '3'){
                Left.addClass('switch-on').removeClass('switch-off');
                steer.addClass('Direction_Left');
            }
            if (config.Data[OnOff_Direction_Right].value == '0') {
                Right.removeClass('switch-on').addClass('switch-off');
                steer.removeClass('Direction_Right');
            } else if(config.Data[OnOff_Direction_Right].value == '4'){
                Right.addClass('switch-on').removeClass('switch-off');
                steer.addClass('Direction_Right');
            }
        }
        this.init(config);
        this.OnOff_Start(config);
    };
    DA.steeringWheel = steeringWheel
    return DA.steeringWheel;
})

// //模拟数据
// var data = {
//     'OnOff_Start': {
//         'value': '0'
//     },
//     'OnOff_Direction_Backward': {
//         'value': '0'
//     },
//     'OnOff_Direction_Forward': {
//         'value': '0'
//     },
//     'OnOff_Direction_Left': {
//         'value': '1'
//     },
//     'OnOff_Direction_Right': {
//         'value': '1'
//     }
// }