export interface ListItem {
    title: string,
    avatar: string,
    time: string,
    message: string,
    tag: string,
    tagType ?: "success" | "warning" | "info" | "danger"
}
