<template>
    <div style="overflow: hidden;height: fit-content">
        <div class="header">
            <slot name="header">
                <div v-if="tableConfig.title" class="title">{{ tableConfig.title }}</div>
                <div class="handler">
                    <!--<slot name="headerHandler"></slot>-->
                </div>
            </slot>
        </div>
        <el-table
                :data="listData"
                border
                @selection-change="handleSelectionChange"
                v-bind="tableConfig.NativeProps"
        >
            <el-table-column
                    v-if="tableConfig.showSelectColumn"

                    type="selection"
                    align="center"
                    width="60"
            >
            </el-table-column>
            <el-table-column
                    v-if="tableConfig.showIndexColumn"
                    type="index"
                    label="序号"
                    align="center"
                    width="80"
            >
                <template #default="{$index}">
                    {{ $index + 1 + (_page.currentPage - 1) * _page.pageSize }}
                </template>
            </el-table-column>
            <el-table-column
                v-for="propItem in tableConfig.TableColumns"
                :key="propItem.NativeProps.prop"
                v-bind="{...tableConfig.TableColumnsConfig,...propItem.NativeProps}"
            >
                <template #default="scope">
                    <template v-if="Boolean(propItem.slotName)">
                        <slot
                            :name="propItem.slotName"
                            v-bind="setSlotValue(scope,propItem.NativeProps.prop)"
                        >
                            {{ scope.row[propItem.NativeProps.prop] }}
                        </slot>
                    </template>
                    <template v-else>
                        {{ scope.row[propItem.NativeProps.prop] }}
                    </template>
                </template>
            </el-table-column>

            <template v-for="_slot in nativeSlotsMap.get('_')||[]"
                      v-slot:[_slot.key] :key="_slot.value"
            >
                <slot :name="_slot.value" />
            </template>
        </el-table>
        <div
                v-if="tableConfig.showFooter"
                class="footer"
                style="display: flex;justify-content: right;margin-top: 10px;">
            <el-pagination
                    v-model:current-page="_page.currentPage"
                    v-model:page-size="_page.pageSize"
                    :page-sizes="[10, 20, 30]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="_page.total"
                    @size-change="handlePageSizeChange"
                    @current-change="handleCurrentChange"
                    v-bind="tableConfig.pagination"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script setup lang="ts" name="JzTable">
import {ElTable,ElPagination,ElTableColumn} from "element-plus"
import type {ITable, Page} from "../../types";
const props = defineProps<{
    listData: Array<any>,
    tableConfig: ITable<any>,
    page?: Page,
}>();

let self = getCurrentInstance()
let nativeSlotsMap = new Map<string,{key:string,value:string}[]>()
if (self?.slots) {
    Object.keys(self.slots).filter((item)=>item.indexOf("_")===0).forEach((item)=>{
        let key = "_"
        let value = item.substring(1)
        let obj= {
            key: value,
            value: item
        }
        if (!nativeSlotsMap.get(key)) {
            nativeSlotsMap.set(key,[obj])
        }else{
            nativeSlotsMap.get(key)!.push(obj)
        }
    })

}

const _page = reactive(props.page ? props.page : {
    currentPage: 1,
    pageSize:    10,
    total:       0
});

let slotValue = reactive({} as any)
function setSlotValue(scope:any ,prop:any ) {
    scope.row.hasOwnProperty(prop) && (slotValue[scope.$index] = scope.row[prop])
    return scope
}
watch(slotValue,()=>{
    emit("change",getData())
})

const emit = defineEmits(["pageSize", "currentPage","change"]);

function handleSelectionChange() {
}

function handlePageSizeChange() {
    _page.currentPage = 1
    emit("pageSize", _page);
}

function handleCurrentChange() {
    emit("currentPage", _page);
}

function getData(){
    return props.listData.map((item,index)=>{
        item.Num = slotValue[index] || 0
        return item
    })
}
defineExpose({
    getData
});
</script>

<style scoped>

</style>
