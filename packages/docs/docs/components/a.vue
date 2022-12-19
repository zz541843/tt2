<template>
    <div>
        aaaaa
        <JzMsgList :listData="[{title:'asdfa','avatar':'3233',time:'asdf','message':'adsfads'}]"  />
        <div class="abc" style="width: 200px;height: 200px;border-radius: 50%;background-color: green;">

        </div>

        <div class="jgg">
            <div v-for="item in 9"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {JzMsgList,JzForm} from "jz-ui-ep"

</script>

<style scoped lang="scss">
.abc{
    box-shadow: 0 0 0 100px rgba(0,0,0,.5) inset;
    transition-duration: .5s;
    /*clip-path: inset(100px 50px);*/
}
.abc:hover{
    box-shadow: 0 0 0 0 rgba(0,0,0,.5) inset;
}
.jgg{
    width: calc(300px + 30px*2);
    aspect-ratio: 1/1;
    display: grid;
    grid-template-columns: repeat(3,100px);
    grid-template-rows: repeat(3,100px);
    grid-gap: 30px;
    transition-duration: .5s;
    div{
        background: no-repeat url("/public/1.jpg");
        background-size: 300px 300px;
        background-position-y: -200px;
    }
    div:nth-child(3n+2){
        background-position-x: -100px;
    }
    div:nth-child(3n){
        background-position-x: -200px;
    }
    div:nth-child(-n+6){
        background-position-y: -100px;
    }
    div:nth-child(-n+3){
        background-position-y: 0;
    }
    &:hover{
        grid-gap: 0px;
    }
}
</style>
