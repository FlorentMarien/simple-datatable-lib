//import { DropDownList } from '@progress/kendo-react-dropdowns';
//import '../styles/default-ocean-blue.css';
import React from 'react';
import { useState,useEffect } from "react";
function DropDownCustom( props ) {
    let data = props.data;
    let [Open,SetOpen] = useState(0);
    let [DropValue,SetDropValue] = useState({label:data.list[data.selectedIndex].label,value:data.list[data.selectedIndex].value,selectedIndex:data.selectedIndex});
    useEffect(() => {
        SetDropValue({label:data.list[data.selectedIndex].label,value:data.list[data.selectedIndex].value,selectedIndex:data.selectedIndex});
    },[props.onChange])
    function Clicklisthandle(e){
        let selectedIndex = e.target.options.selectedIndex;
        if(props.onChange !== undefined) props.onChange({label:e.target.options[selectedIndex].label,value:e.target.value, selectedIndex:selectedIndex});
        else SetDropValue({label:e.target.options[selectedIndex].label,value:e.target.value, selectedIndex:selectedIndex});
    }
    return (
        <div> 
            {
            Open === 0 &&
            <select id={document.getElementsByTagName("select").length === undefined ? "datatable-select-pagination-1" : "datatable-select-pagination-"+document.getElementsByTagName("select").length} onChange={(e) => Clicklisthandle(e)} value={DropValue.value}>
            {    
                data.list.map((element) =>
                <option value={element.value}>{ element.label === undefined ? element.value : element.label}</option>
            )}
            </select>
            }
        </div>
    );
}


export default DropDownCustom;