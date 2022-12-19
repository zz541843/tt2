import * as Excel from "exceljs";
import {saveAs} from "file-saver";

const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
export const exportExcel = (data, fileName = "download") => {
    let workbook = new Excel.Workbook();
    let sheet1 = workbook.addWorksheet("sheet1")
    sheet1.addRows(data)
    workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], {type: EXCEL_TYPE});
        saveAs(blob, `${fileName}.xlsx`);
    });
};
