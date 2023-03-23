import type { ParsedUrlQuery } from "querystring";
import { stringify } from "node:querystring";
import type Koa from "koa";

/**
 * 302 重定向,将用户访问302重定向到新的页面中去
 * @param context 请求对象
 * @param url 重定向地址
 */
function by302(context: Koa.Context, url: string) {
    var newUrl = makeRedirectUrl(context.query, url);
    // 重定向到处理后的地址
    context.redirect(newUrl);
}
export { by302 }


/**
 * 使用页面 meta 或者 location.href 进行重定向
 * @param context 请求对象
 * @param url     重定向地址
 * @param msg     重定向提示信息
 * @param origin  同域跳转
 */
function byJS(context: Koa.Context, url: string, msg: string, origin: string) {
    msg = msg || "正在为您跳转...";
    var newUrl = origin ? url : makeRedirectUrl(context.query, url);
    // 返回重定向页面
    context.body = `<html><head><title>跳转</title><noscript><meta http-equiv="refresh" content="0; url=${newUrl}"></noscript><script>window.location.href = "${newUrl}";</script></head><body>${msg}</body></html>`;
}
export { byJS }

/**
 * 使用 meta 重定向
 * @param context 请求对象
 * @param url     重定向地址
 */
function byMeta(context: Koa.Context, url: string) {
    var newUrl = makeRedirectUrl(context.query, url);
    // 返回重定向页面
    context.body = '<html><head><title>跳转</title><noscript><meta http-equiv="refresh" content="0; url=' + newUrl + '"></noscript><script>window.location.href = "' + newUrl + '";</script></head><body>正在为您跳转...</body></html>';
}
export { byMeta }


/**重新整理重定向链接 */
function makeRedirectUrl(query: ParsedUrlQuery, url: string) {
    var queryString = "?";
    const hashIndex = url.indexOf("#");
    const urlpath = hashIndex > -1 ? url.substring(0, hashIndex) : url;
    const queryIndex = urlpath.indexOf("?");

    // 拼接 URL 参数
    queryString += stringify(query);

    // 已经有参数，插入原参数位置
    if (queryIndex > 0) {
        // 如果已有参数则需要在替换字符串最后加上 &
        // /detail/?id=1
        // /detail/?id=1#123
        if (queryIndex < url.length - 1 &&
            (hashIndex < 0 || hashIndex - queryIndex > 1)) {
            queryString += '&';
        }
        url = url.replace('?', queryString);

        // 还没有参数，自己找位置合适的位置
    } else {
        // if (queryString === "?") {
        //     queryString = "";
        // }
        // 有 # ，将参数放在 # 前
        if (hashIndex > 0) {
            var arr = url.split("#");
            arr.splice(1, 0, queryString, "#");
            url = arr.join("");
            // 无 # ，直接将参数拼接在最后
        } else {
            url += queryString;
        }
    }
    return url;
}
export { makeRedirectUrl }
