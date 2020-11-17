import React from 'react';
import CSVReader from 'react-csv-reader';
import DataGrid from './DataGrid';

interface BodyProps {
    parsedData: any;
    handleCsv: HandleCsv;
    handleChange: any;
}

export default function Body(props: BodyProps) {
    const parsingConfig = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
    }
    if(props.parsedData === null) {
        return (
            <CSVReader parserOptions={parsingConfig} onFileLoaded={(data, fileInfo) => props.handleCsv(data)}/>
        );
    } else  {
        return (
            <DataGrid rows={props.parsedData} />
        );
    }
}