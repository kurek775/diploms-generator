import * as XLSX from "xlsx";

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
  let finalData: Record[] = [];
  categories.forEach((cat) => {
    const filtered = data.filter((d) => d.Kategorie === cat);
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
            currentRank++;
            lastValue = currentValue;
          }

          result.push({
            "Jméno a příjmení": entry["Jméno a příjmení"],
            Kategorie: entry.Kategorie,
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
  | "Střelba"
  | "Discgolf"
  | "Biatlon"
  | "Luk"
  | "Tanec"
  | "Cornhole"
  | "Člunkový běh"
  | "Opičárna";
export type SortType = "Min" | "Max" | "Time";
export interface Sport {
  name: SportType;
  sort: SortType;
}
const sports: Sport[] = [
  {
    name: "Střelba",
    sort: "Max",
  },
  {
    name: "Discgolf",
    sort: "Min",
  },
  {
    name: "Biatlon",
    sort: "Time",
  },
  {
    name: "Člunkový běh",
    sort: "Time",
  },
  {
    name: "Opičárna",
    sort: "Time",
  },
  {
    name: "Luk",
    sort: "Max",
  },
  {
    name: "Tanec",
    sort: "Max",
  },
  {
    name: "Cornhole",
    sort: "Max",
  },
];

const categories = [
  "piškoti",
  "starší dívky",
  "mladší dívky",
  "starší chlapci",
  "mladší chlapci",
  "nejstarší dívky",
  "nejstarší chlapci",
  "nejmladší dívky",
  "nejmladší chlapci",
];

export default processFile;
