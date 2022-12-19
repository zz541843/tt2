import Components from "./comps"
import type {App} from "vue";
function installer(app:App){
    Components.forEach(item=>{
        app.component(item.name,item)
    })
}
export default installer
export * from "./hooks";
// export * from "./utils";
export * from "./components"
export * from "./components/types"
