export interface ReqCommonPage {
    Start: number,
    Length: number,
    IsAll: number, // 是否全部获取
}

export interface ResCommonList {
    Total: number;
}
export interface Page  {
    currentPage: number,
    pageSize: number,
    total: number
}
export type NonReadOnly<T> = {
    -readonly [P in keyof T]: T[P];
};
