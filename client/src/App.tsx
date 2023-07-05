import React from 'react';
import './App.css';
import InputForm from './InputForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import PDFDownloadLink from "@react-pdf/renderer";
import createDocument from "./services/pdfCreator";

function App() {
    const data = [
        {
            Kategorie: 2,
            "Jméno a příjmení": "wwe eee",
            "Umístění": 1
        },
        {
            Kategorie: 1,
            "Jméno a příjmení": "eww www",
            "Umístění": 2
        },
        {
            Kategorie: 4,
            "Jméno a příjmení": "Jan jakm",
            "Umístění": 3
        }
    ];

    return (
        <>
            <InputForm />
        </>
    );
}

export default App;
