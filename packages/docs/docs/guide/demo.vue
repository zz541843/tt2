<template>
    <div>
        {{formData}}

        <JzForm
            v-model="formData"
            :form-config="formConfig"
        />
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {FormType, type IForm,JzForm} from "jz-ui-ep";

let formData = ref({} as any);
let formConfig = ref(<IForm<any>>{
    NativeProps:{},
    FormItemsConfig: {
        labelWidth: "210px",
        clearable:  true
    },
    formItems: [
        {
            type: FormType.Input,
            NativeProps:{
                prop:"A",
                label: "姓名"
            }
        },
        {
            type: FormType.Select,
            NativeProps: {
                prop: "adsf",
                label: "爱好"
            },
            SubComponentNativeProps: {
                placeholder: "请选择",
                options: [
                    {label: "唱",value:"sing"},
                    {label: "跳",value:"jump"},
                    {label: "rap",value:"rap"},
                    {label: "篮球",value:"basketball"},
                ]
            }
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
        {
            type: FormType.DateTimePicker,
            NativeProps: {
                prop: "startTime|endTime",
                label: "1s",
            },
            SubComponentNativeProps:{
                type: "datetimerange",
                placeholder: "时间范围"
            }
        },
    ]
});
</script>

<style scoped>

</style>
