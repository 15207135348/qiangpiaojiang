let basePath = 'https://yangyun.picp.vip';
// let basePath = 'https://yangyun.xiaomy.net';
// let basePath = 'https://yangyun.xyz';
let urls = {
    LOGIN_WX_URL: basePath + '/auth/login_wx',
    GET12306ACCOUNT_URL: basePath + '/auth/get_12306_account',
    SET12306ACCOUNT_URL: basePath + "/auth/set_12306_account",
    FUCK12306_URL: basePath + "/12306/fuck12306",
    GET_TRAINS_URL: basePath + "/12306/get_trains",
    GET_ORDERS_URL: basePath + "/12306/get_orders",
    GET_PEOPLE_URL: basePath + "/12306/get_people",
    GET_QUERT_COUNT_URL: basePath + "/12306/get_query_count",
    CANCEL_ORDER_URL: basePath + "/12306/cancel_order",
    DELETE_ORDER_URL: basePath + "/12306/delete_order",
    GET_SUCCESS_ORDER_URL: basePath + "/12306/get_success_info",
    GET_SUCCESS_AN_ORDER_URL: basePath + "/12306/get_an_success_info",
}
var post = function (url, data, success) {
    var header = {
        'content-type': 'application/json; charset=utf-8',
        'cookie': wx.getStorageSync("sessionid")
    };
    wx.request({
        url: url,
        method: "POST",
        header: header,
        data: data,
        success(res) {
            var cookie = res.header["Set-Cookie"];
            if (cookie != null) {
                wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
            }
            success(res);
        }
    })
}
var get = function (url, data, success) {
    var header = {
        'content-type': 'application/json; charset=utf-8',
        'cookie': wx.getStorageSync("sessionid")
    };
    wx.request({
        url: url,
        method: "GET",
        header: header,
        data: data,
        success(res) {
            var cookie = res.header["Set-Cookie"];
            if (cookie != null) {
                wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
            }
            success(res);
        }
    })
}
module.exports = {
    urls: urls,
    get: get,
    post: post
}