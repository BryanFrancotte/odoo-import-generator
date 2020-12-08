import React from 'react';
import CSVReader from 'react-csv-reader';
import DataGrid from './DataGrid';

interface BodyProps {
    parsedData: any;
    handleCsv: HandleCsv;
    handleChange: any;
    handlePictureChange: (img: File, imgName: string, productId: string) => void;
}

export default function Body(props: BodyProps) {
    const parsingConfig = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
    }
    if(props.parsedData === null) {
        return (
            <CSVReader parserOptions={parsingConfig} onFileLoaded={(data) => props.handleCsv(data)}/>
        );
    } else  {
        return (
            <DataGrid rows={props.parsedData} 
                onPictureChange={(img, imgName, productId) => props.handlePictureChange(img, imgName, productId)} />
        );
    }
}