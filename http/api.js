const http = ({
    url = '',
    param = {},
    ...other
} = {}) => {
    wx.showLoading({
        title: '加载中...'
    });
    let timeStart = Date.now();
    return new Promise((resolve, reject) => {

        wx.request({
            url: url,
            data: param,
            header: {
                'content-type': 'application/json' // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
            },
            ...other,
            complete: (res) => {
                wx.hideLoading();
                console.log(`耗时${Date.now() - timeStart}`);
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }
        })
    })
}
module.exports = {
    http
}