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

      let objects = rows.map((row) => {
        const obj: { [key: string]: string } = {};
        headerRow.forEach((header, index) => {
          console.log(`Header: ${header}, Value: ${row[index]}`);
          obj[header] = row[index] as string;
        });
        return obj;
      });
      console.log(objects);
      if (objects[0] && objects[0].hasOwnProperty("Třída")) {
        const d = parseUnsortedData(objects as Record[]);
        console.log("Parsed data:", d);
        resolve(d);
      } else {
        resolve(objects);
      }
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

type Record = {
  "Jméno a příjmení": string;
  Třída: string | number;
  [column: string]: string | number; // volitelné další sloupce (např. Krádež, Lov, Běh atd.)
};

function parseUnsortedData(data: Record[]): any[] {
  const dataWithCategories = data.map((record) => {
    const category = record["Třída"] as number;
    return { ...record, Category: getCategory(category) };
  });

  let finalData: Record[] = [];
  categories.forEach((cat) => {
    const filtered = dataWithCategories.filter(
      (d) => d.Category === cat.category
    );
    sports.forEach((sport: Sport) => {
      const sortedWithPlacement = (() => {
        const sorted = filtered.sort((a, b) => {
          const aValue = a[sport.name] as number;
          const bValue = b[sport.name] as number;
          if (sport.sort === "Min" || sport.sort === "Time") {
            return aValue - bValue; // Ascending
          } else if (sport.sort === "Max") {
            return bValue - aValue; // Descending
          }
          return 0;
        });

        let result: any[] = [];
        let lastValue: number | null = null;
        let currentRank = 0;

        for (const [index, entry] of sorted.entries()) {
          const currentValue = entry[sport.name] as number;

          if (lastValue === null || currentValue !== lastValue) {
            currentRank++; // Only increment rank when value changes
            lastValue = currentValue;
          }

          result.push({
            "Jméno a příjmení": entry["Jméno a příjmení"],
            Kategorie: entry.Category,
            Disciplína: sport.name,
            Umístění: currentRank,
          });
        }

        return result.filter((s) => s["Umístění"] <= 3); // Keep top 3 rank groups
      })();

      finalData = finalData.concat(sortedWithPlacement);
    });
  });

  return finalData;
}

export type SportType =
  | "Krádež"
  | "Lov"
  | "Běh"
  | "Plavání"
  | "Jízda na kole"
  | "Volejbal"
  | "Fotbal"
  | "Hokej";
export type SortType = "Min" | "Max" | "Time";
export interface Sport {
  name: SportType;
  sort: SortType;
}
const sports: Sport[] = [
  {
    name: "Krádež",
    sort: "Min",
  },
  {
    name: "Lov",
    sort: "Max",
  },
  {
    name: "Běh",
    sort: "Time",
  },
];

const categories = [
  { category: "Nejmladší", range: [1, 2, 3] },
  { category: "Prostřední", range: [4] },
  { category: "Starší", range: [5] },
  { category: "Neznámá kategorie", range: [6] },
];
function getCategory(category: number): string {
  const found = categories.find((c) => c.range.includes(category));
  return found ? found.category : "Neznámá kategorie";
}

export default processFile;
