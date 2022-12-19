<template>
    <div class="wrapper" style="width: 300px;display: flex;flex-wrap: wrap">
        <template v-if="imageList.length">
            <div v-for="(item,index) in imageList" style="width: 100px; height: 100px;overflow: hidden;
            border: 1px solid #bbbbbb;border-radius: 4px;position: relative">
                <el-image
                          style=""
                          :src="item"
                          fit="fill" />
                <div class="mask">
                    <abc-ep-search @click="openView(index)" />
                    <abc-ep-close @click="reduceImage(index)" />
                </div>
            </div>
        </template>
        <el-upload
            v-if="imageList.length< maxQuantity"
            class="avatar-uploader"
            style="width: 100px;height: 100px;"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="upload"
            multiple
        >
            <el-icon class="avatar-uploader-icon">
                <abc-ep-plus />
            </el-icon>
        </el-upload>

        <el-image ref="imageShowRef"
                  v-if="imageList.length"
                style="width: 0;height: 0;"
                :src="imageList[currentImageIndex]"
                :preview-src-list="imageList"
                :initial-index="currentImageIndex"
                fit="cover"
        />
    </div>
</template>

<script setup lang="ts" name="JzUploadImage">
import OSS from 'ali-oss'
import {ElMessage,ElImage, type UploadRequestOptions} from "element-plus";
import type { UploadProps } from 'element-plus'
// import {api_getAliOssToken} from "@/request/config";
// import { v4 as uuidv4 } from 'uuid';
let props = withDefaults(defineProps<{
    modelValue: Array<string>,
    imgType: string,
    maxQuantity ?: number,
    maxSize ?: number,
    api: Function
}>(),{
    maxQuantity: 3,
    maxSize: 1024 * 1024,
    imgType: 'image/jpeg',
    api: function (a:any) {
        return Promise.resolve(a)
    }
})
const emit = defineEmits(["update:modelValue"])
// defineExpose({
//
// })
// todo 全局配置或者独立配置
let componentsConfig = {} as any
let api_getAliOssToken = (componentsConfig.JzUploadImageConfig.api || props.api) as any
let imageList = $computed(()=>{
    return props.modelValue
})

let currentImageIndex = $ref(0)
let dialogVisible = $ref(false)
let imageShowRef = $ref<InstanceType<typeof ElImage>>()
let totalNum = $ref(0)

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    // imageList.push(URL.createObjectURL(uploadFile.raw!))
    imageList.push(response.url)
}
function openView(index:number) {
    dialogVisible=true;currentImageIndex=index
    if(imageShowRef){
        imageShowRef.$el.getElementsByTagName("img")[0].dispatchEvent(new MouseEvent('click'));
    }
}
function reduceImage(index:number) {
    imageList.splice(index,1)
    totalNum --
    emit("update:modelValue",imageList)
}


const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (props.imgType && rawFile.type !== props.imgType) {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size > props.maxSize) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    } else if(totalNum +1 > props.maxQuantity){
        ElMessage.error('最多两张')
        return false
    }
    emit("update:modelValue",imageList)
    totalNum ++
    return true
}
function upload(uploadRequestOptions: UploadRequestOptions) {
    return api_getAliOssToken({FilePath: uploadRequestOptions.file.name}).then((res:any)=>{
        let oss = new OSS({
            accessKeyId:             res.AccessKeyId,
            accessKeySecret:         res.AccessKeySecret,
            bucket:                  res.BucketName,
            // cname:                   res.Domain,
            endpoint:                res.EndPoint,
            internal:                undefined,
            refreshSTSToken(): Promise<{ accessKeyId: string; accessKeySecret: string; stsToken: string }> {
                return Promise.resolve({accessKeyId: "", accessKeySecret: "", stsToken: ""});
            },
            region:                  res.Region,
            secure:                  undefined,
            stsToken:                res.SecurityToken,
            timeout:                 res.Expiration
        })

        return oss.put(res.ObjectName,uploadRequestOptions.file)
    })
}
</script>


<style scoped lang="scss">
.avatar-uploader :deep(.el-upload){
    //background-color: black;
}
:deep(.avatar-uploader) .el-upload{
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    width: 100%;
    height: 100%;
    &:hover{
        border-color: var(--el-color-primary);
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 100%;
        text-align: center;
    }
}
.mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity:0;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    &:hover{
        opacity:1;
        transition: all 0.2s;
    }
}

</style>
