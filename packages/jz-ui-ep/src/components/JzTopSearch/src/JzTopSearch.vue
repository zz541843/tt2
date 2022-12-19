<template>
    <div>
        <div class="wrapper" style="transition: all 0.3s;overflow: hidden;" :style="{height: fold ? foldHeight : unfoldHeight }">
            <div ref="formRef" inline style="display: flex;flex-wrap: wrap;">
                <template v-for="item in formConfig.formItems" :key="item.NativeProps.label">
                    <el-form-item
                        style="margin-right: 20px;"
                        v-show="item.isHidden !== false"
                        v-bind="{style:{width:'200px'},...formConfig.FormItemsConfig,...item.NativeProps}"
                    >
                        <template v-if="item.type === FormType.Input || item.type === FormType.Password">
                            <el-input
                                v-model="data[item.NativeProps.prop]"
                                v-bind="{...item.SubComponentNativeProps}"
                                @input="handleValueChange($event,item )"
                            />
                        </template>

                        <template v-if="item.type === FormType.Select">
                            <el-select v-model="data[item.NativeProps.prop]"
                                       v-bind="{...item.SubComponentNativeProps}"
                                       @change="handleValueChange($event,item);"
                            >
                                <el-option
                                    v-for="optionItem in item.SubComponentNativeProps.options"
                                    :key="optionItem.value"
                                    :label="optionItem.label"
                                    :value="optionItem.value"
                                />
                            </el-select>
                        </template>
                        <template v-if="item.type === FormType.DateTimePicker">
                            <el-date-picker
                                v-model="data[item.NativeProps.prop]"
                                v-bind="{...item.SubComponentNativeProps}"
                                @change="handleValueChange($event,item)"
                            />
                        </template>
                    </el-form-item>
                </template>
            </div>
        </div>
        <div style="display: flex;justify-content: flex-end">
            <el-link v-if="foldable" size="small" type="primary" :underline="false"  @click="fold = !fold" style="margin-right: 10px;">
                {{ fold ? "展开筛选" :"收起筛选" }}</el-link>
            <el-link v-if="clearable" size="small" type="info" :underline="false"  @click="handleClearClick">清空筛选</el-link>
        </div>
    </div>
</template>

<script setup lang="ts" name="JzTopSearch">
import {
    ElForm,
    ElFormItem,
    ElInput,
    ElOption,
    // ElRadioGroup,
    // ElRadio,
    // ElCheckbox,
    // ElCheckboxGroup
} from "element-plus";

import {type IForm, FormType} from "../../types";
const props = defineProps<{
    modelValue: any,
    labelWidth?: string,
    formConfig: IForm<any>, // 引用类型，不建议在props里更改，ReadOnly无法限制
    foldable ?: boolean,
    clearable ?: boolean
}>()
const emit = defineEmits(['change','update:modelValue'])
let data = $ref({} as any)
const fold = $ref(false)
let foldHeight = $ref("")
let unfoldHeight = $ref("")
let formRef = $ref<HTMLElement>()

function handleValueChange(e: any, item: any) {
    // console.log(e,field)
    // cb && cb()
    emit("update:modelValue",data)
    emit("change", data)
}
const handleClearClick = ()=>{
    data = {}
    emit("update:modelValue",data)
    emit("change", data)
}
const handleResize = ()=>{
    let firstDiv = formRef.children[0] as HTMLElement
    unfoldHeight = formRef.scrollHeight + "px"
    foldHeight = firstDiv.offsetHeight + +window.getComputedStyle(firstDiv).marginBottom.replace("px","") + "px"
}
onMounted(()=>{
    handleResize()
    window.addEventListener("resize",handleResize)
})
onUnmounted(()=>{
    window.removeEventListener("resize",handleResize)
})
</script>

<style scoped>
</style>
