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
        <div className='table-header'>
            <div className='container-searchglobal-addelement'>
            {
                props.searchGlobal === true &&
                <InputTextCustomGlobal placeholder="SearchGlobal" onChange={(e) => { 
                    state.statepaginator[1]({...state.statepaginator[0],viewPage:0});
                    state.Search[1]({ ...state.Search[0], ["searchGlobal"]: e.target.value})
                }} />
            }
            {
                props.addElement !== undefined && props.addElement
            }
            </div>
            <div className='table-thead'>
                {
                    props.children.map( x => {
                    return ( 
                        <div className='table-td'>
                            { 
                                x.props.search === true &&
                                    <InputTextCustom className="input-search-min" placeholder="Search ?" onChange={(e)=>{
                                        state.statepaginator[1]({...state.statepaginator[0],viewPage:0});state.Search[1](  { ...state.Search[0], [x.props.field]: e.target.value}  )
                                    }} />
                            }
                        </div> 
                    )})
                }
            </div>
            <div className='table-thead thead-field'>
                {
                    props.children.map( x => {
                    return ( 
                        <div className='table-td'>
                        
                            <div>
                            <p className='p-field-category'>{x.props.field}</p>
                            {
                                x.props.sortable === true &&
                                <div>
                                    <div className='arrow-up' onClick={(e)=>{arrowActive(e);FilterColumnAscend({field: x.props.field, dataType: x.props.dataType === undefined ? "string" : x.props.dataType, state:state})}} name="Filter list ascending"/>
                                    <div className='arrow-down' onClick={(e)=>{arrowActive(e);FilterColumnDesc({field: x.props.field, dataType: x.props.dataType === undefined ? "string" : x.props.dataType, state:state,})}} name="Filter list descending"/>
                                </div>
                            }
                            </div>
                        </div> 
                    )})
                }
            </div>
        </div>
        : <div className='table-header border-radius'><div className='table-thead'><div className='table-td'><p>Aucune colonne n'a été ajouté</p></div></div></div>
        }
        </>
    );
}
export function DatatableCustom(props) {
    let [listUser,setlistUser] = useState(null);
    let [Search,SetSearch] = useState({});
    let [StatePaginator,SetStatePaginator] = useState({viewPage: 0,arrayPaginator: props.paginator === undefined ? [10] : props.paginator,focusPaginator: props.paginator === undefined ? 10 : props.paginator[0]});
    let [filterOrder,setfilterOrder] = useState({});
    console.log(filterOrder);
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

    let returnlistUser = listUser.map(dataelement => {
            let elementSearch = 0;
            if(Search["searchGlobal"] !== undefined)
            {
                let incr = 0;
                Object.keys(dataelement).forEach((e)=>{
                    if(obj[e] !== undefined){
                        if(obj[e].type === 'string') if(dataelement[e].includes(Search["searchGlobal"])) incr +=1 ;
                        if(obj[e].type === 'date' ) {
                            if(dataelement[e].toLocaleDateString(obj[e].formatdateType).includes(Search["searchGlobal"])) incr +=1 ;
                        }
                    }
                });
                if(incr > 0) elementSearch += 1;
            }
            Object.keys(Search).forEach((e)=>{
                if(e !== 'searchGlobal'){
                    if(obj[e] !== undefined){
                        if(obj[e].type === 'string') if( dataelement[e].includes(Search[e])) elementSearch +=1;
                        if(obj[e].type === 'date') {
                            if(dataelement[e].toLocaleDateString(obj[e].formatdateType).includes(Search[e])) elementSearch +=1 ;
                        }
                    }
                }
            });
            if(Object.values(Search).length === 0 || Object.values(Search).length <= elementSearch){

                let line= (
                    <>
                        {children.map( x => { 
                            let localobj = {
                                columName:x.props.field,
                                value:dataelement[x.props.field],
                                dataType:x.props.dataType === undefined ? "string" : x.props.dataType,
                            };
                            if(x.props.dataType === 'date') localobj = {
                                ...localobj,
                                formatdateType: obj[x.props.field].formatdateType,
                            }
                            
                            return CelCustom(localobj);
                            })
                        }
                    </>
                );
                if(line.props.children !== undefined ) line = (<div className="table-tr">{line}</div>);
                return line;
            }
    });
    let returntampon = [];
    returnlistUser.forEach((e)=>{
        if(e !== undefined) returntampon.push(e);
    })

    returnlistUser = returntampon;
    let iteration = 0;
    let datatable = (
        <>
        <div id={props.id !== undefined && props.id} className='datatable'> 
            {HeaderCustom({...props,children:children}, {listUser:[listUser,setlistUser],Search:[Search,SetSearch],statepaginator:[StatePaginator,SetStatePaginator],filterOrder:[filterOrder,setfilterOrder]})}
            {
            children.length > 0 &&
            <div className='table-data'>
                {returnlistUser.map((e)=>{ if((iteration < (StatePaginator.focusPaginator*(StatePaginator.viewPage+1))) && (iteration >= (StatePaginator.focusPaginator*StatePaginator.viewPage))){ 
                    iteration++;
                    return e;
                    } else{ iteration++; }
                })}
                {(returnlistUser.length === 0) ? Object.values(Search).length > 0 ? <p className='msg-nocontent'>Aucun élément ne correspond à votre recherche</p> : <p className='msg-nocontent'>Aucune données détectées</p> : null }
            </div>
            }
            {FooterCustom({...props,children:children}, [StatePaginator,SetStatePaginator], returnlistUser.length)}
        </div>
        
        </>
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
                        <p>Element(s) par page:</p>
                        {
                            <DropdownCustom data={{list:returnnbrpagination,selectedIndex:statepaginator[0].arrayPaginator.indexOf(statepaginator[0].focusPaginator)}} onChange={(e) => { statepaginator[1]({...statepaginator[0],focusPaginator: parseInt(e.value),viewPage:0}) }}/>
                         } 
                    </div>
                    <div>
                        <div className='table-icon'>
                            <div className='arrow-left' onClick={(e)=>{ statepaginator[1]({...statepaginator[0],viewPage: (statepaginator[0].viewPage-1) < 0  ? nbrpage-1 : statepaginator[0].viewPage-1}) }}/>
                        </div>
                        <p><a className='focus-page'>{statepaginator[0].viewPage+1}</a>/{nbrpage}</p>
                        <div className='table-icon'>
                            <div className='arrow-right' onClick={(e)=>{ statepaginator[1]({...statepaginator[0],viewPage: (statepaginator[0].viewPage+1) >= nbrpage ? 0 : statepaginator[0].viewPage+1}) }}/>
                        </div>
                    </div>
                    
                    </>
                }
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

