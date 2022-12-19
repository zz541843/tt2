import type {ReqCommonPage,Page,ResCommonList} from "./types"
type useListFunc<Req,Res> = (req:Req)=> Promise<Res>

interface useListReq<Req,Res>{
    requestFunc:useListFunc<Req,Res>, // 请求方法
    beforeRequest?: (req:Req)=> void, // 请求前回调, 参数响应式
    afterRequest?: (res:Res)=> void, // 请求后回调, 参数响应式
    immediate?: boolean, // 立即执行
    pageInit ?: Partial<Page>, // 分页器初始化
    reqInit ?: Partial<Req>, // 初始化请求体
    resInit ?: Partial<Res>, // 初始化返回体
    // pagination ?: boolean //是否需要分页
}

/**
 * 通用列表hooks
 */
export function useList<Req extends ReqCommonPage ,Res extends ResCommonList>
                ({requestFunc, beforeRequest,afterRequest, immediate = true,
                     pageInit,reqInit,resInit}:useListReq<Req,Res>) {
    let pageReq = $ref ((pageInit || {})as Page);

    let req = $ref((reqInit || {}) as Req);
    let res = $ref((resInit || {}) as Res);
    let loading = $ref(false)

    async function loadList(data :Partial<Req>={}) {
        loading = true
        // 第一次请求默认是
        if(pageReq.currentPage){
            req.Start = (pageReq.currentPage-1)*pageReq.pageSize
            req.Length = pageReq.pageSize ;
        }else {
            req.Start = 0
            req.Length = 10
        }
        // 内部req作为请求基础, 外部传参可覆盖
        let _req = {...(unref(req) as Req),...(Object.keys(data as any).length ? data as any : {})}
        if (beforeRequest) {
            await beforeRequest(_req as Req)
        }
        await requestFunc(_req).then(async r=>{
            if (afterRequest) {
                await afterRequest(r)
            }
            res = r as any
            pageReq.total = r.Total
            loading = false
            return res
        }).catch(async e=>{
            // if (resHandle) {
            //     await resHandle(res as any)
            // }
            res = {} as any
            loading = false
            return e
        })
    }
    function search(data: Partial<Req>){
        req = data as any
        return loadList()
    }
    function pageChange(page: Page){
        pageReq = page
        return loadList()
    }

    immediate && loadList()

    return $$({
        req,res,pageReq,
        loadList, search, pageChange,loading
    });
}
