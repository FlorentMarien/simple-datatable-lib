import './../styles/Input.css';
import './../styles/DatatableCustom.css';
import React from 'react';
import { useState } from 'react';

import LoopIcon from './../assets/icon/loop-svgrepo-com.svg';
import DropdownCustom from './DropdownCustom';
import {InputTextCustom,InputTextCustomGlobal} from './InputTextCustom';

export function ColumnCustom(props) {
   return (<></>);
}
function arrowActive(e){
    if(document.getElementsByClassName("active-arrow").length !== 0){
        document.getElementsByClassName("active-arrow")[0].className=document.getElementsByClassName("active-arrow")[0].className.replace("active-arrow","");
    }
    if(!e.target.className.includes("active-arrow")) e.target.className += " active-arrow";

}
function CelCustom(props){
    let view;
    if(props.dataType === "string" ) view = (<div className='table-td'><p>{props.value}</p></div>);
    if(props.dataType === "date" ) view = (<div className='table-td'><p>{new Date(props.value).toLocaleDateString(props.formatdateType)}</p></div>);
    return ( view )
}
function HeaderCustom(props, state){
    return (
        <>
        { 
        props.children.length > 0 ?
            ((props.searchGlobal === false || props.searchGlobal == undefined) && props.addElement === undefined) ?
            <></>
            : <div className='table-header'>
                <div className='container-searchglobal-addelement'>
                {
                    props.searchGlobal === true &&
                    <InputTextCustomGlobal key="search-global" placeholder="SearchGlobal" onChange={(e) => { 
                        let tampon = {...state.Search[0],["searchGlobal"]: e.target.value};
                        if(e.target.value==="") delete tampon["searchGlobal"];
                        state.statepaginator[1]({...state.statepaginator[0],viewPage:0});
                        state.Search[1]({ ...tampon})            
                    }} />
                }
                {
                    props.addElement !== undefined && props.addElement
                }
                </div>
            </div>
            
        : <div className='table-header --noradius'><div className='table-thead'><div className='table-td'><p>Aucune colonne n'a été ajouté</p></div></div></div>
        }
        </>
    );
}
export function DatatableCustom(props) {
    let [listUser,setlistUser] = useState(null);
    let [Search,SetSearch] = useState({});
    let [StatePaginator,SetStatePaginator] = useState({viewPage: 0,arrayPaginator: props.paginator === undefined ? [10] : props.paginator,focusPaginator: props.paginator === undefined ? 10 : props.paginator[0]});
    let [filterOrder,setfilterOrder] = useState({});
    //init
    let filterForm = [];
    let obj = {};
    let children = (props.children === undefined) ? [] : props.children.length > 1 ? [...props.children]:[props.children];
    let propsdata = props.data === undefined ? [] : [...props.data];
    children.forEach((column)=>{
        let field = column.props.field;
        let formatdateType = "en-US";
        if(column.props.dataType === 'date'){
            if(column.props.formatdateType !== undefined){
                try{
                    new Date("01/01/1970").toLocaleDateString(column.props.formatdateType);
                    formatdateType = column.props.formatdateType;
                }catch{
                    console.log("Error local tag date");
                }
            }
        }
        obj = {
            ...obj,
            [field]: column.props['dataType'] === 'date' ? {type:column.props['dataType'],formatdateType:formatdateType} : {type:'string'},
        }
    })
    
    let x = 0;
    propsdata.forEach((e)=>{
        filterForm.push({...e});
        Object.keys(e).forEach((efield)=>{
            if(obj[efield] !== undefined){
                if(obj[efield].type === "date" && isNaN(e[efield])){
                    filterForm[x][efield] = new Date(e[efield]);
                }
            }
    });
    x++;
    });
    
    if(filterOrder !== null){
        if(filterOrder.order === "asc") filterForm.sort(function(a,b) { return a[filterOrder.field] < b[filterOrder.field] ? -1 : 1});
        if(filterOrder.order === "desc") filterForm.sort(function(a,b) { return a[filterOrder.field] > b[filterOrder.field] ? -1 : 1});
    }

    listUser = [...filterForm];
    
    //refresh
    if(props.paginator !== undefined ) if(props.paginator !== StatePaginator.arrayPaginator) StatePaginator = {...StatePaginator,arrayPaginator:props.paginator,focusPaginator:props.paginator[0]};
    //
    let indexLine = -1;
    let returnlistUser;
    if(Object.keys(Search).length > 0){ returnlistUser = listUser.map(dataelement => {
            
            let add = false;
            let incr = 0;
            if(Search["searchGlobal"] !== undefined)
            {
                Object.keys(dataelement).forEach((e)=>{
                    if(obj[e] !== undefined){
                        if(obj[e].type === 'string') if(dataelement[e].includes(Search["searchGlobal"])) add=true;
                        if(obj[e].type === 'date' ) {
                            if(dataelement[e].toLocaleDateString(obj[e].formatdateType).includes(Search["searchGlobal"])) add=true;
                        }
                    }
                });
                if(add === true ) incr +=1;
            }
            Object.keys(Search).forEach((e)=>{
                if(e !== 'searchGlobal'){
                    if(obj[e] !== undefined){
                        if(obj[e].type === 'string') if( dataelement[e].includes(Search[e])) incr+=1;
                        if(obj[e].type === 'date') {
                            if(dataelement[e].toLocaleDateString(obj[e].formatdateType).includes(Search[e])) incr+=1;
                        }
                    }
                }
            });
            if(Object.keys(Search).length <= incr) return dataelement;
    })}else returnlistUser = listUser;
    let returntampon = [];
    
    returnlistUser.forEach((e)=>{
        if(e !== undefined) returntampon.push(e);
    })
    returnlistUser = returntampon;

    let activelementsearch = 0;
    children.forEach((e)=>{
        if(e.props.search === true) activelementsearch+=1;
    })
    let column = -1;
    let datatable = (
        <div key="datatable" id={props.id !== undefined && props.id} className='datatable'>
            {HeaderCustom({...props,children:children}, {listUser:[listUser,setlistUser],Search:[Search,SetSearch],statepaginator:[StatePaginator,SetStatePaginator],filterOrder:[filterOrder,setfilterOrder]})}
            {
                <div key="table-data" className={returnlistUser.length === 0 ? 'table-data --nodata' : 'table-data'}>
                {children.map((x)=>{
                    let iteration = -1;
                    column += 1;
                    return (
                    <div key={"table-data-"+column}>
                        {
                        activelementsearch > 0 &&
                        <div key={"table-thead-"+column} className='table-thead'>
                            {x.props.search === true ?
                                <InputTextCustom key={"searcho-"+x.props.field} className="input-search-min" placeholder="Search ?" onChange={(e)=>{
                                        let tampon = {...Search,[x.props.field]: e.target.value};
                                        if(e.target.value==="") delete tampon[x.props.field];
                                        SetStatePaginator({...StatePaginator,viewPage:0});
                                        SetSearch(  { ...tampon})
                                }}/>
                            : <div key={"table-thead-"+column} className='emptySearch'></div>
                            }
                        </div>
                        }
                        { 
                        <>
                        <div className='table-thead thead-field'>
                            <p>{x.props.field}</p>
                            {x.props.sortable === true &&
                                <div>
                                    <div className='arrow-up' onClick={(e)=>{arrowActive(e);FilterColumnAscend({field: x.props.field, dataType: x.props.dataType === undefined ? "string" : x.props.dataType, state:{filterOrder:[filterOrder,setfilterOrder]}})}} name="Filter list ascending"/>
                                    <div className='arrow-down' onClick={(e)=>{arrowActive(e);FilterColumnDesc({field: x.props.field, dataType: x.props.dataType === undefined ? "string" : x.props.dataType, state:{filterOrder:[filterOrder,setfilterOrder]},})}} name="Filter list descending"/>
                                </div> 
                            }
                        </div>
                        <div className='table-data-container'>
                        {
                            returnlistUser.map((e)=>{
                            iteration++;
                            if(iteration >= StatePaginator.focusPaginator*StatePaginator.viewPage && iteration < StatePaginator.focusPaginator*(StatePaginator.viewPage+1)){
                                if(e[x.props.field] !== undefined && obj[x.props.field].type === "string") return (<div key={'data-'+x.props.field+"-"+iteration}><p key={'data-'+x.props.field+"-"+iteration+"-p"}>{e[x.props.field]}</p></div>)
                                if(e[x.props.field] !== undefined && obj[x.props.field].type === "date") return (<div key={'data'+x.props.field+"-"+iteration}><p key={'data-'+x.props.field+"-"+iteration+"-p"}>{e[x.props.field].toLocaleDateString(obj[x.props.field].formatdateType)}</p></div>)
                            }
                            })}
                        </div>
                        </>
                        }
                    </div>
                    )
                })}
                </div>
            }

            {
            returnlistUser.length === 0 && <div className='datatable-error --noradius'><p>Aucune données</p></div>
            }
            {FooterCustom({...props,children:children}, [StatePaginator,SetStatePaginator], returnlistUser.length)}
        </div>
     );
    return (
        <>
            {datatable}
        </>
    );
}
function FooterCustom(props, statepaginator, nbrelementinview){
    let nbrpage = Math.ceil(nbrelementinview / statepaginator[0].focusPaginator);
    let returnnbrpagination = [];

    for(let x = 0; x<statepaginator[0].arrayPaginator.length; x++){
        returnnbrpagination.push({label:statepaginator[0].arrayPaginator[x],value:statepaginator[0].arrayPaginator[x]});
    }

    return(
        <>
        {
        props.children.length > 0 &&
        <div className='table-footer table-tr'>
            <div className='table-td'>
                {
                    <>
                    <p>{statepaginator[0].focusPaginator*statepaginator[0].viewPage +1} - {statepaginator[0].focusPaginator*(statepaginator[0].viewPage+1)} of {nbrelementinview}</p>
                    </>
                }
            </div>
            <div className='table-td'>
                {
                    <>
                    <div>
                        <label htmlFor={document.getElementsByTagName("select").length === undefined ? "datatable-select-pagination-1" : "datatable-select-pagination-"+parseInt(document.getElementsByTagName("select").length+1)}>Element(s) par page:</label>
                        {
                            <DropdownCustom key="dropdown-paginator" data={{list:returnnbrpagination,selectedIndex:statepaginator[0].arrayPaginator.indexOf(statepaginator[0].focusPaginator)}} onChange={(e) => { statepaginator[1]({...statepaginator[0],focusPaginator: parseInt(e.value),viewPage:0}) }}/>
                         } 
                    </div>
                   
                    
                    </>
                }
            </div>
            <div >
                <div className='table-icon'>
                    <div className='arrow-left' onClick={(e)=>{ statepaginator[1]({...statepaginator[0],viewPage: (statepaginator[0].viewPage-1) < 0  ? nbrpage-1 : statepaginator[0].viewPage-1}) }}/>
                </div>
                <p><a className='focus-page'>{statepaginator[0].viewPage+1}</a>/{nbrpage}</p>
                <div className='table-icon'>
                    <div className='arrow-right' onClick={(e)=>{ statepaginator[1]({...statepaginator[0],viewPage: (statepaginator[0].viewPage+1) >= nbrpage ? 0 : statepaginator[0].viewPage+1}) }}/>
                    </div>
                </div>
            </div>
        }
        </>
    )
}
function FilterColumnDesc(obj){
    let filterOrder = obj.state.filterOrder;
    filterOrder[1]({order:"desc",field:obj.field});
}
function FilterColumnAscend(obj){
    let filterOrder = obj.state.filterOrder;
    filterOrder[1]({order:"asc",field:obj.field});
}

