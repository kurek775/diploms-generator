import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import processFile from "./services/fileReader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./services/pdfCreator";

interface FormValues {
  file: File | null;
  number: number;
}

const InputForm = () => {
  const [generated, setGenerated] = useState<Boolean>(false);
  const [excelValues, setExcelValues] = useState<any>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    file: null,
    number: 0,
  });

  useEffect(() => {
    if (excelValues) {
      console.log(excelValues);
      setGenerated(true);
    }
  }, [excelValues]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFormValues((prevValues) => ({ ...prevValues, file }));
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const number = Number(event.target.value);
    setFormValues((prevValues) => ({ ...prevValues, number }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    processFile(formValues.file).then((r) => {
      setExcelValues(r);
    });
  };

  return (
    <Card>
      <div className="card-body">
        <h5 className="card-title">Generátor diplomů</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">
              Soubor:
            </label>
            <input
              type="file"
              className="form-control"
              id="fileInput"
              accept=".xlsx"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="numberInput" className="form-label">
              Rok:
            </label>
            <input
              type="number"
              className="form-control"
              id="numberInput"
              value={formValues.number}
              onChange={handleNumberChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Vygeneruj
          </button>
        </form>
      </div>
      {generated ? (
        <PDFDownloadLink
          className="btn btn-primary"
          document={<MyDocument objects={excelValues} />}
          fileName="example.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Načítání dokumentu..." : "Stáhnout"
          }
        </PDFDownloadLink>
      ) : (
        <br />
      )}
    </Card>
  );
};

export default InputForm;
