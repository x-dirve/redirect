# NodeJs 服务端重定向模块

`@x-9lab/xlab` 使用的重定向模块

## 重定向类型

- 302 重定向
    ```ts
    /**
    * 302 重定向,将用户访问302重定向到新的页面中去
    * @param context 请求对象
    * @param url 重定向地址
    */
    function by302(context: Koa.Context, url: string): void;
    ```

- 使用页面 meta 或者 location.href 进行重定向
    ```ts
    /**
    * 使用页面 meta 或者 location.href 进行重定向
    * @param context 请求对象
    * @param url     重定向地址
    * @param msg     重定向提示信息
    * @param origin  同域跳转
    */
    function byJS(context: Koa.Context, url: string, msg: string, origin: string): void;
    ```

- 使用 meta 重定向
    ```ts
    /**
    * 使用 meta 重定向
    * @param context 请求对象
    * @param url     重定向地址
    */
    function byMeta(context: Koa.Context, url: string): void;
    ```

## 其他方法

- 重新整理重定向链接
    ```ts
    /**重新整理重定向链接 */
    function makeRedirectUrl(query: ParsedUrlQuery, url: string): string;
    ```