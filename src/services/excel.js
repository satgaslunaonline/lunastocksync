import * as XLSX from "xlsx";

export async function readExcel(file) {

    const data = await file.arrayBuffer();

    const workbook = XLSX.read(data);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json(sheet, {
        defval: ""
    });

    return rows;

}