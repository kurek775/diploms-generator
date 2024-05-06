import * as XLSX from "xlsx";
import createDocument from "./pdfCreator";

function fileReader(f: File | null): Promise<{ [key: string]: string }[]> {
  return new Promise((resolve, reject) => {
    if (!f) {
      reject(new Error("File is null."));
      return;
    }

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target?.result as string;
      const wb = XLSX.read(bstr, { type: "binary" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const [headerRow, ...rows] = data;

      const objects = rows.map((row) => {
        const obj: { [key: string]: string } = {};
        headerRow.forEach((header, index) => {
          obj[header] = row[index] as string;
        });
        return obj;
      });

      resolve(objects);
    };

    reader.onerror = (evt) => {
      reject(new Error("Error reading file."));
    };

    reader.readAsBinaryString(f);
  });
}

async function processFile(f: File | null) {
  try {
    const objects = await fileReader(f);
    return objects;
  } catch (error) {
    console.error(error);
  }
}

export default processFile;
