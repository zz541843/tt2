<template>
    <ElForm ref="formRef" :model="formData" v-bind="formConfig.NativeProps" @submit.prevent>
        <TransitionGroup v-if="1===1" mode="out-in"
                               :css="false"
                               v-on="transitionFuncs"
            >
                <template v-for="(fItem,index) in formConfig.formItems"
                          :key="obj2singleArray(fItem).key"
                >
                    <div :style="{
                        display: obj2singleArray(fItem).data.length === 1 ? 'block' : 'flex'
                    }">
                        <div v-for="(item,index) in obj2singleArray(fItem).data"
                             :style="obj2singleArray(fItem).data.length === 1 ? '' : 'flex-grow: 1;flex-basis: 50%'">
                            <!-- 自定义 -->
                            <div v-if="item.slotName && item.isHidden !== false"
                                 class="bd1-transparent"
                                 :data-index="index"
                                 :data-key="item.NativeProps.prop"
                                 ref="itemRefs"
                            >dd 
                                <!-- 和表单项统一的label间距的插槽 -->
                                <ElFormItem
                                    v-if="item.slotViewInElFormItem"
                                    v-bind="{...getLabelWidth,...item.NativeProps}"
                                >
                                    <slot  :name="item.slotName">{{item.slotName}}插槽</slot>
                                </ElFormItem>
                                <!-- 纯纯自己发挥的插槽 -->
                                <template v-else >
                                    <slot  :name="item.slotName">{{item.slotName}}插槽</slot>
                                </template>
                            </div>
                            <!-- 表单项 -->
                            <template v-else-if="!item.slotName&&item.NativeProps.prop" >
                                <div :data-index="index"
                                     :data-key="item.NativeProps.prop"
                                     :key="item.NativeProps.prop"
                                     v-show="item.isHidden !== false"
                                     ref="itemRefs"
                                     class="bd1-transparent"
                                >
                                    <!-- 上面预留位 -->
                                    <div :style="`padding-left:${formConfig.FormItemsConfig.labelWidth}`">
                                        <!--<div style="line-height: unset">-->
                                        <slot :name="item.NativeProps.prop+'Top'"></slot>
                                    </div>
                                    <ElFormItem v-bind="{...getLabelWidth,...item.NativeProps}">
                                        <div style="display: flex;flex:1;flex-basis: 0">
                                            <slot :name="item.NativeProps.prop+'Left'">
                                                <!-- 左面预留位 -->
                                            </slot>
                                            <div style="flex:1">
                                                <div v-bind="item.NativeProps?.ContainerConfig||{}">
                                                    <template v-if="item.type === FormType.Input">
                                                        <ElInput
                                                            v-model="formData[item.NativeProps.prop]"
                                                            v-bind="item.SubComponentNativeProps"

                                                            @input="handleValueChange(item,$event)"
                                                            :show-password="item.type === 'password'"
                                                        >
                                                            <!--<template v-if="formItemSlotsMap.get(item.NativeProps.prop)">-->
                                                            <template v-for="_slot in formItemSlotsMap.get(item.NativeProps.prop)||[]"
                                                                      v-slot:[_slot.key] :key="_slot.value"
                                                            >
                                                                    <slot :name="_slot.value" />
                                                            </template>
                                                            <!--</template>-->
                                                        </ElInput>
                                                    </template>

                                                    <template v-if="item.type === FormType.Radio">
                                                        <ElRadioGroup v-model="formData[item.NativeProps.prop]" v-bind="item.SubComponentNativeProps?.ContainerConfig||{}" @change="handleValueChange(item,$event)">
                                                            <ElRadio v-for="subItem in item.SubComponentNativeProps.radios.data"
                                                                     v-bind="{...item.SubComponentNativeProps.radios.SharedConfig,...subItem}">
                                                                <span v-html="subItem.text"></span>
                                                            </ElRadio>
                                                        </ElRadioGroup>
                                                    </template>

                                                    <template v-if="item.type === FormType.Select">
                                                        <el-select v-model="formData[item.NativeProps.prop]"
                                                                   v-bind="item.SubComponentNativeProps"
                                                                   @change="handleValueChange(item,$event);"
                                                        >
                                                            <!--
                                                            remote
                                                            @change="handleValueChange($event, item.field,item.remote);"
                                                            @focus="item.options= item.remote()"
                                                            :remote-method="(query)=>{
                                                                           item.options=item.remote(query)
                                                                       }"
                                                            -->
                                                            <el-option
                                                                v-for="optionItem in item.SubComponentNativeProps.options"
                                                                :key="optionItem.value"
                                                                :label="optionItem.label"
                                                                :value="optionItem.value"
                                                            />
                                                        </el-select>
                                                    </template>

                                                    <template v-if="item.type === FormType.Checkbox">
                                                        <el-checkbox-group
                                                            v-model="formData[item.NativeProps.prop]"
                                                            @change="handleValueChange(item,$event);"
                                                        >
                                                            <el-checkbox
                                                                v-for="checkboxItem in item.SubComponentNativeProps.checkboxes.data"
                                                                v-bind="{...item.SubComponentNativeProps.checkboxes.ShareConfig,...checkboxItem}"
                                                            >{{checkboxItem.text}}</el-checkbox>
                                                        </el-checkbox-group>
                                                    </template>

                                                    <template v-if="item.type === FormType.DateTimePicker">
                                                        <el-date-picker
                                                            v-model="formData[item.NativeProps.prop]"
                                                            v-bind="{
                                                                'value-format': 'YYYY-MM-DD HH:mm:ss',
                                                                ...item.SubComponentNativeProps
                                                            }"
                                                            @change="handleValueChange(item,$event)"
                                                        />
                                                    </template>

                                                    <template v-if="item.type === FormType.ImageUpload">
                                                        <JzUploadImage
                                                            v-model="formData[item.NativeProps.prop]"
                                                        />
                                                    </template>

                                                    <template v-if="item.type === FormType.RichTextTinymce">
                                                        <Editor
                                                            v-model="formData[item.NativeProps.prop]"
                                                            :init="{ language: 'zh_CN' }"
                                                            apiKey="zf3igpj0t0ofl8bnzykqu3yq6qvjq8b71nm45qdw0wldcepj"

                                                            style="width: 100%"
                                                        />
                                                    </template>

                                                    <template v-if="item.type === FormType.RichTextWang">
                                                        <div style="border: 1px solid #ccc;">
                                                            <div v-if="wangEditorIdMap.get(item.NativeProps.prop+'toolbar')"
                                                                 :id="wangEditorIdMap.get(item.NativeProps.prop+'toolbar')">
                                                            </div>
                                                            <div v-if="wangEditorIdMap.get(item.NativeProps.prop+'editor')"
                                                                 :id="wangEditorIdMap.get(item.NativeProps.prop+'editor')">
                                                            </div>
                                                        </div>
                                                    </template>
                                                </div>
                                                <!-- 下面预留位 -->
                                                <!--<div :style="`padding-left:${formConfig.FormItemsConfig.labelWidth}`">-->
                                                <div style="line-height: normal">
                                                    <slot :name="item.NativeProps.prop+'Bottom'"></slot>
                                                </div>
                                            </div>
                                            <slot :name="item.NativeProps.prop+'Right'">
                                                <!-- 右面预留位 -->
                                            </slot>
                                        </div>
                                    </ElFormItem>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </TransitionGroup>
    </ElForm>
</template>

<script setup lang="ts" name="JzForm">
// import JzUploadImage from "@/components/JzUploadImage/src/JzUploadImage.vue";
import Editor from "@tinymce/tinymce-vue";
import {gsap} from "gsap"
import {type IForm, FormType,type ExtractEmits,type LooseObject} from "../../types";
import '@wangeditor/editor/dist/css/style.css'

import {v4 as uuidv4} from "uuid"
import {createEditor, createToolbar, type IDomEditor, type IEditorConfig, type IToolbarConfig} from "@wangeditor/editor";
import {
    ElForm,ElFormItem,ElInput,ElRadioGroup,
    ElRadio,ElOption,ElCheckbox,ElCheckboxGroup,
    ElDatePicker
} from "element-plus";
const props = withDefaults(defineProps<{
    modelValue: LooseObject,
    formConfig: IForm<LooseObject>,
}>(),{
    formConfig: {
        FormItemsConfig: {
            labelWidth: "120px"
        },
    } as any
})

const formRef = $ref<ExtractEmits<typeof ElForm>>()
const formData = reactive({} as any)
defineExpose({
    getFormRef : ()=> formRef as any
})

let wangEditorIdMap = new Map()
// const rules: FormRules = reactive({})
// let labelWidth = reactive({
//     // Remark:"0px"
// } as any)
// const flat

let self = getCurrentInstance()
let formItemSlotsMap = new Map<string,{key:string,value:string}[]>()
if (self?.slots) {
    Object.keys(self.slots).filter((item)=>item.includes("_")).forEach((item)=>{
        let [key,value] = item.split("_")
        let obj= {
            key: value,
            value: item
        }
        if (!formItemSlotsMap.get(key)) {
            formItemSlotsMap.set(key,[obj])
        }else{
            formItemSlotsMap.get(key)!.push(obj)
        }
    })

}


props.formConfig.formItems.flat().forEach((item)=>{
    let key = item.NativeProps.prop as string
    if (item.type as FormType === FormType.RichTextWang) {
        wangEditorIdMap.set(key +"toolbar",key +"toolbar"+uuidv4())
        wangEditorIdMap.set(key +"editor",key +"editor"+uuidv4())
    }
    if (props.formConfig?.FormItemsConfig?.ContainerConfig?.style) {
        let cConfigStyle = props.formConfig.FormItemsConfig.ContainerConfig.style
        if (!item.NativeProps?.ContainerConfig?.style) {
            item.NativeProps.ContainerConfig = {
                style:{}
            }
        }
        item.NativeProps.ContainerConfig.style = {...cConfigStyle,...item.NativeProps.ContainerConfig?.style}
    }

    formData[key] = props.modelValue[key]

    // rules[item.field] = item.rules
    // if (!item.NativeProps.prop){
    //     return
    // }
    // labelWidth[item.NativeProps.prop] = '0'
    // if (typeof item.NativeProps.prop === "string") {
    //     labelWidth[item.NativeProps.prop] = '0'
    // } else if (typeof item.NativeProps.prop === "symbol"){
    //     item.NativeProps.prop.description && (labelWidth[item.NativeProps.prop.description] = '0')
    // }
})
// props.formConfig.formItems.forEach(({NativeProps})=>{
//     let key = NativeProps.prop as string
    // if (props.modelValue[key] === null || props.modelValue[key] === undefined){
    //     switch (typeof props.modelValue[key]) {
    //         case "string": data[key] = "";break;
    //         case "number": data[key] = 0;break;
    //     }
    //     if(Array.isArray(props.modelValue[key])){
    //         data[key] = []
    //     }
    //     console.log(typeof props.modelValue[key]);
    // }else{
    //     data[key] = props.modelValue[key]
    // }
    // formData[key] = props.modelValue[key]
// })

let ffff = reactive({} as any)

const itemRefs = $ref([] as any[])

let getOffsetHeight = $computed(()=>{
    return itemRefs.map((item:HTMLElement)=>{
        return [item.dataset.key,item.offsetHeight]
    })
})
let getLabelWidth = $computed(()=>{
    return {labelWidth:props.formConfig.FormItemsConfig?.labelWidth??null}
})
onMounted(()=>{
    nextTick(()=>{
        // itemRefs.forEach((item:HTMLElement)=>{
        //     if (item.getElementsByTagName("label").length &&
        //         item.getElementsByTagName("label")[0].nextElementSibling?.parentElement?.className.indexOf("el-form-item")!=-1) {
        //         console.log(item.getElementsByTagName("label")[0]);
        //         // item.dataset.key && (labelWidth[item.dataset.key] = item.getElementsByTagName("label")[0].style.width)
        //     }
        // })
        if (wangEditorIdMap.size !== 0) {
            props.formConfig.formItems.flat().forEach(item=>{
                if (item.type as FormType === FormType.RichTextWang) {
                    wangEditorInit(item.NativeProps.prop as string)
                }
            })
        }
    })
})

function wangEditorInit(id:string) {
    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {}
    editorConfig.placeholder = '请输入内容'
    editorConfig.onChange = (editor: IDomEditor) => {
        // 当编辑器选区、内容变化时，即触发
        console.log('content', editor.children)
        console.log('html', editor.getHtml())
    }

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}

    // 创建编辑器
    const editor = createEditor({
        selector: '#'+wangEditorIdMap.get(id +"editor"),
        config: editorConfig,
        mode: 'default' // 或 'simple' 参考下文
    })
    // 创建工具栏
    const toolbar = createToolbar({
        editor,
        selector: '#'+wangEditorIdMap.get(id +"toolbar"),
        config: toolbarConfig,
        mode: 'default' // 或 'simple' 参考下文
    })
}
// let getLabelWidth = computed(()=>(key:any)=>{
//     return labelWidth.hasOwnProperty(key) ? labelWidth[key] : '-100px'
// })

// const divDomList = $ref(new Map());

// const getDivDom = (el:any)=> {
//         console.log(el);
//     // if (el) {
//     //     divDomList.set(el.dataset['id'], el)
//     // }
// }
// watch(formData,()=>{
//     console.log(formData);
//     emit("change", convertFormData())
//     emit("update:modelValue",convertFormData())
// })
const emit = defineEmits(["change","update:modelValue"])

function handleValueChange(item: any, e?: any) {
    console.log(item.NativeProps.prop,e);
    if (item.type === FormType.DateTimePicker ){
        if(["datetimerange","daterange"].includes(item.SubComponentNativeProps?.type)){
            if(item.NativeProps.prop.indexOf("|")!==-1){
                let arr= item.NativeProps.prop.split("|")
                formData[arr[0]] = e[0]
                formData[arr[1]] = e[1]
            }
        }
    }
    emit("change", convertFormData())
    emit("update:modelValue",convertFormData())
}
function convertFormData() {
    let obj:any = {}
    Object.keys(formData).forEach((key:string)=>{
        if(!key.includes("|")){
            obj[key] = formData[key]
        }
    })
    return obj
}
let transitionFuncs = $computed(()=>{
    return props.formConfig.isTransition ? {
        beforeEnter,
        enter,
        leave
    } : {}
})
function beforeEnter(el:any) {
    // console.log("%O",el.childNodes);
    el.style.opacity = 0;
    el.style.height = 0;
    nextTick(() =>{
        if (el.getElementsByTagName("label").length &&
            el.getElementsByTagName("label")[0].nextElementSibling?.parentElement?.className === "el-form-item") {
            // el.dataset.key && (labelWidth[el.dataset.key] = el.getElementsByTagName("label")[0].style.width)
        }


        /*if (el?.childNodes?.length) {
            console.log(el?.childNodes);
            if (el.getElementsByTagName("label").length &&
                el.getElementsByTagName("label")[0].nextElementSibling?.parentElement?.className === "el-form-item") {
                el.dataset.key && (labelWidth[el.dataset.key] = el.getElementsByTagName("label")[0].style.width)
            }
            el.childNodes.forEach((item:HTMLElement)=>{
                if (item.tagName && "LABEL" === item.tagName.toUpperCase()) {
                    console.log("%O",item);
                    labelWidth[el.dataset.key] = item.style.width
                }
            })
        }*/
        // 具体是为了下margin
        /*if (!ffff.hasOwnProperty(el.dataset.key)) {
            ffff[el.dataset.key] = window.getComputedStyle(el, null)
        }*/
    })
}
function enter(el:any, done:any) {
    nextTick(() =>{
        nextTick(()=>{
            console.log("%O",el);
        })

        console.log(itemRefs.map((item: HTMLElement) => {
            return [item.dataset.key, item.offsetHeight];
        }));
        gsap.to(el, {
            opacity: 1,
            height: "auto",
            // height: itemRefs.filter((item: HTMLElement) => {
            //     return item.dataset.key === el.dataset.key
            // })[0].offsetHeight,
            // height: ffff.hasOwnProperty(el.dataset.key)? ffff[el.dataset.key].height:"auto",
            // margin: ffff.hasOwnProperty(el.dataset.key)? ffff[el.dataset.key].margin : 0,
            onComplete: done,
            // duration: 2,
            // borderWidth:"1px"
        })
    })
}
function leave(el:any, done:any) {
    nextTick(()=>{
        gsap.to(el, {
            opacity: 0,
            height: 0,
            // margin:0,
            onComplete: done,
            // duration: 2,
            borderWidth:0
        })
    })
}

const obj2singleArray = (obj:any)=>{
    let res = {
        data: [] as any[],
        key: ""
    }
    if (!(obj instanceof Array)) {
        res.data = [obj]
    }else{
        res.data = obj
    }
    res.data.forEach((item)=>{
        res.key += item.NativeProps.prop || item.slotName
    })

    return res
}

</script>

<style scoped>

.bd1-transparent{
    border: 1px solid transparent;
    /*box-sizing: border-box*/
    /*overflow:hidden !important;*/
    margin: 0 !important;
    /*height: auto;*/
    /*background-color: #78b4b4;*/
    /*position: absolute;*/
}
:deep(.el-form-item){
    /*margin: 0;*/
}
:deep(.w-e-scroll){
    min-height: 100px !important;
}
:deep(.w-e-text-placeholder){
    top: 10px
}
:deep(.tox-statusbar__branding){
    display: none;
}
:deep(.el-select){
    width: 100%;
}

:deep(.el-date-editor.el-input){
    width: 100%;
}
</style>
