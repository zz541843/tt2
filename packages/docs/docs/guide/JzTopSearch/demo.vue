<template>
    <div>
        <JzTopSearch
            v-model="topData"
            :form-config="topConfig"
            clearable
            foldable
        />
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {FormType, type IForm} from "jz-ui-ep";

let topData = ref({} as any)
let topConfig = ref(<IForm<any>>{
    NativeProps:{},
    FormItemsConfig:{
    },
    formItems: [
        {
            type: FormType.Input,
            NativeProps: {
                prop: "CorpName",
            },
            SubComponentNativeProps:{
                placeholder: "企业名称",
                clearable: true,
            }
        },
        {
            type: FormType.Select,
            NativeProps: {
                prop: "IsStar"
            },
            SubComponentNativeProps:{
                placeholder: "是否为明星企业",
                options: [
                    {label: "明星企业", value: 1},
                    {label: "非明星企业", value: 2}
                ],
                clearable: true,
            },
        },
        {
            type: FormType.DateTimePicker,
            NativeProps: {
                prop: "DescByCreateAt",
                label: "1s"
            },
            SubComponentNativeProps:{
                placeholder: "时间"
            }
        },
    ]
})
</script>

<style scoped>

</style>
