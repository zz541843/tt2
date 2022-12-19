<template>
    <div v-for="item in listData">
        <div class="container">
            <div v-if="item.avatar" class="avatar" style="">
                头像
            </div>
            <div style="display: flex;flex-direction: column;flex-grow: 1;justify-content: space-between;">
                <div
                    v-if="item.title"
                    style="display:flex;justify-content: space-between;"
                >
                    <div>{{item.title}}</div>
                    <div v-if="item.tag" >
                        <ElTag :type="item.tagType">{{item.tag}}</ElTag>
                    </div>
                </div>
                <div v-if="item.time" class="time">{{item.time}}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="JzMsgList">

import {type ListItem} from "../../JzMsgList/type";
const props = defineProps<{
    listData: Array<ListItem>,
}>()

</script>

<style scoped lang="scss">
.container{
    display: flex;
    align-items: stretch;

    .avatar{
        width: 34px;
        height: 34px;
        margin: 4px;
    }
    .time{
        color: #656565;
        font-size: 12px;
    }
}
</style>
