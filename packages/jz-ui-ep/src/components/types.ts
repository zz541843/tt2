import type {Ref,DefineComponent} from "vue";

export enum FormType{
    "Input"=1 ,
    "Password" ,
    "Select" ,
    "DatePicker",
    "Radio",
    "Checkbox",
    "ImageUpload",
    "RichTextTinymce",
    "RichTextWang",
    "DateTimePicker"
}

import type {
    Arrayable,
    SFCWithInstall
} from "element-plus/es/utils";
import type {
    FormItemRule
} from "element-plus/es/tokens/form";
import {
    ElTable,
    ElTableColumn,
    ElFormItem,
    ElForm,
    ElInput,
    ElSelect,
    ElOption,
    ElRadioGroup,
    ElRadio,
    ElCheckboxGroup,
    ElCheckbox,
    ElDatePicker,
    ElPagination,
} from "element-plus";
type NonReadOnly<T> = {
    -readonly [P in keyof T]: T[P];
};
export type ExtractEmits<T> = T extends DefineComponent<any, infer U, any, any, any, any, any, any> ? U : unknown
// type GetComponentsProps<T> =
//     T extends SFCWithInstall<infer E> ?
//         T extends abstract new (...args: any) => infer R ?
//             NonReadOnly<Partial<Omit<R, "prop">>>: never :
//         never
type abc = InstanceType<typeof ElForm>

type GetComponentsProps<T extends abstract new (...args: any) => any> = NonReadOnly<Partial<Omit<InstanceType<T>, "prop">>>
type FormPropsType = GetComponentsProps<typeof ElForm >
type FormItemPropsType = GetComponentsProps<typeof ElFormItem >
type RadioPropsType = GetComponentsProps<typeof ElRadio>
type OptionPropsType = GetComponentsProps<typeof ElOption>
type CheckboxPropsType = GetComponentsProps<typeof ElCheckbox>
type DatePickerPropsType = GetComponentsProps<typeof ElDatePicker>
type PaginationPropsType = GetComponentsProps<typeof ElPagination>
export interface Page  {
    currentPage: number,
    pageSize: number,
    total: number
}
export type LooseObject = {
    [index: string]: any
}
type SelectOption = {label:string,value:any}[]
export type IFormItem<T extends LooseObject | any> =  {
// export type IFormItem<T = any> =  {
    rules?: Arrayable<FormItemRule>,
    isHidden?: Ref<boolean>,
    NativeProps : FormItemPropsType  & {
        prop : keyof T | string,
        ContainerConfig ?: {
            style ?: Partial<CSSStyleDeclaration>
        }
    },
    slotName ?: string, // 插槽名称
    slotViewInElFormItem ?: boolean, // 插槽是否在ElFormItem里
    [index: string]: any,
} & MutableRecord<{
    [FormType.Input]: GetComponentsProps<typeof ElInput>
    [FormType.Select]: Partial<Omit<GetComponentsProps<typeof ElSelect>,"options">> &{
        options: OptionPropsType[] ,
    },
    [FormType.Radio]: Partial<Omit<GetComponentsProps<typeof ElRadioGroup>,"radios">> &{
        // radios?: Ref<GetComponentsProps<typeof ElRadio>&{text:string}[]>
        radios : {
            data:(RadioPropsType & {text:string})[],
            SharedConfig ?: RadioPropsType
        }
    },
    [FormType.Checkbox]:Partial<GetComponentsProps<typeof ElCheckboxGroup>> &{
        checkboxes:{
            data: (CheckboxPropsType& {text:string})[],
            SharedConfig ?: CheckboxPropsType
        }
    },
    [FormType.DateTimePicker]:  DatePickerPropsType,
    [FormType.ImageUpload]: {},
    [FormType.RichTextTinymce]: {},
    [FormType.RichTextWang]: {},
}>

export interface IForm<T = any> {
    NativeProps : Partial<Omit<FormPropsType, "rules">> & {
        rules?: Partial<Record<keyof T, Arrayable<FormItemRule>>> | undefined
    },
    formItems:  (IFormItem<T>|IFormItem<T>[])[];
    FormItemsConfig ?: {
        labelWidth ?: string;
        clearable ?: boolean;
        [key: string]: any;
    },
    isTransition?: boolean,
}

type MutableRecord<U> = {
    [SubType in keyof U]: {
        type ?: SubType;
        SubComponentNativeProps ?: U[SubType] & {
            ContainerConfig ?: {
                style ?: Partial<CSSStyleDeclaration>
            }
        }
    };
}[keyof U];

// type d<T> = T extends SFCWithInstall<infer E> ? E : T


export interface ITable<T> {
    title ?:string,
    NativeProps ?: GetComponentsProps<typeof ElTable>,
    TableColumns: Array<{
        [key: string]: any;
        slotName?: string,
        NativeProps: GetComponentsProps<typeof ElTableColumn> & { prop ?: keyof T },
    }>,
    TableColumnsConfig ?: GetComponentsProps<typeof ElTableColumn>,
    showIndexColumn ?: boolean,
    showSelectColumn ?: boolean,
    showFooter ?: boolean,
    pagination: PaginationPropsType
}
export type {
    OptionPropsType
}

export interface ReqCommonPage {
    Start: number,
    Length: number,
    IsAll: number, // 是否全部获取
}

export interface ResCommonList {
    Total: number;
}
export interface Page  {
    currentPage: number,
    pageSize: number,
    total: number
}
