import './../styles/Input.css';
import './../styles/DatatableCustom.css';
import React from 'react';
import { useState } from 'react';

import LoopIcon from './../../src/assets/icon/loop-svgrepo-com.svg';
import DropdownCustom from './DropdownCustom';
import {InputTextCustom,InputTextCustomGlobal} from './InputTextCustom';
export function ColumnCustom(props) {
    return(
        <td>{ props.name }</td>
    );
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
    if(props.dataType === "date" ) view = (<div className='table-td'><p>{new Date(props.value).toLocaleDateString(props.formatdateType === undefined ? "en-US" : props.formatdateType)}</p></div>);
    return ( view )
}
function HeaderCustom(props, state){
    
    return (
        <div className='table-header'>
        {
            props.searchGlobal === true &&
            <InputTextCustomGlobal placeholder="SearchGlobal" onChange={(e) => { 
                state.statepaginator[1]({...state.statepaginator[0],viewPage:0});
                state.Search[1]({ ...state.Search[0], ["searchGlobal"]: e.target.value})
            }} />
        }
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
    );
}
export function DatatableCustom(props) {

    let filterForm = [];
    let obj;
    props.children.forEach((column)=>{
        let field = column.props.field;
        obj = {
            ...obj,
            [field]: column.props['dataType'] === 'date' ? {type:column.props['dataType'],formatdateType:column.props['formatdateType']} :  {type:'string'} ,
        }
    })
    let x = 0;
    
    props.data.forEach((e)=>{
        filterForm.push({...e});
        Object.keys(e).forEach((efield)=>{
            if(obj[efield].type === "date" && isNaN(e[efield])){
                filterForm[x][efield] = new Date(e[efield]);
            }
        });
        x++;
    });
    let [listUser,setlistUser] = useState(filterForm);
    let [Search,SetSearch] = useState({});
    let [StatePaginator,SetStatePaginator] = useState({viewPage: 0,arrayPaginator: props.paginator === undefined ? [10] : props.paginator,focusPaginator: props.paginator === undefined ? 10 : props.paginator[0]});
    
    let returnlistUser = listUser.map(dataelement => {
            let elementSearch = 0;
            if(Search["searchGlobal"] !== undefined)
            {
                let incr = 0;
                Object.keys(dataelement).forEach((e)=>{

                    if(obj[e].type === 'string') if(dataelement[e].includes(Search["searchGlobal"])) incr +=1 ;
                    if(obj[e].type === 'date' ) {
                        if(dataelement[e].toLocaleDateString(obj[e].formatdateType).includes(Search["searchGlobal"])) incr +=1 ;
                    }
                });
                if(incr > 0) elementSearch += 1;
            }
            Object.keys(Search).forEach((e)=>{
                if(e !== 'searchGlobal'){
                    if(obj[e].type === 'string') if( dataelement[e].includes(Search[e])) elementSearch +=1;
                    if(obj[e].type === 'date') {
                        if(dataelement[e].toLocaleDateString(obj[e].formatdateType).includes(Search[e])) elementSearch +=1 ;
                    }
                    
                }
            });
            if(Object.values(Search).length === 0 || Object.values(Search).length <= elementSearch){

                let line= (
                    <>
                        {props.children.map( x => { 
                            
                            let obj = {
                                columName:x.props.field,
                                value:dataelement[x.props.field],
                                dataType:x.props.dataType === undefined ? "string" : x.props.dataType,
                            };
                            if(x.props.dataType === 'date') obj = {
                                ...obj,
                                formatdateType: x.props.formatdateType === undefined ? "en-US" : x.props.formatdateType,
                            }
                            
                            return CelCustom(obj);
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
            {HeaderCustom(props, {listUser:[listUser,setlistUser],Search:[Search,SetSearch],statepaginator:[StatePaginator,SetStatePaginator]})}
            <div className='table-data'>
                {returnlistUser.map((e)=>{ if((iteration < (StatePaginator.focusPaginator*(StatePaginator.viewPage+1))) && (iteration >= (StatePaginator.focusPaginator*StatePaginator.viewPage))){ 
                    iteration++;
                    return e;
                    } else{ iteration++; }
                
                })}
                {returnlistUser.length === 0 && <p className='msg-nocontent'>Aucun élément ne correspond à votre recherche</p>}
            </div>
            {FooterCustom(props, [StatePaginator,SetStatePaginator], returnlistUser.length)}
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
    let nbrpage = Math.floor(nbrelementinview / statepaginator[0].focusPaginator);
    let returnnbrpage = [];
    let returnnbrpagination = [];
    for(let x = 0; x <= nbrpage; x++){
        returnnbrpage.push({label:x,value:x});
    }
    for(let x = 0; x<statepaginator[0].arrayPaginator.length; x++){
        returnnbrpagination.push({label:statepaginator[0].arrayPaginator[x],value:statepaginator[0].arrayPaginator[x]});
    }
    return(
        <div className='table-footer table-tr'>
            <div className='table-td'>
                {
                    <>
                    <p>{statepaginator[0].focusPaginator*statepaginator[0].viewPage +1} - {statepaginator[0].focusPaginator*(statepaginator[0].viewPage+1)} of {nbrelementinview}</p>
                    {props.addElement !== undefined && props.addElement }
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
                            <div className='arrow-left' onClick={(e)=>{ statepaginator[1]({...statepaginator[0],viewPage: (statepaginator[0].viewPage-1) < 0 ? nbrpage : statepaginator[0].viewPage-1}) }}/>
                        </div>
                        <p><a className='focus-page'>{statepaginator[0].viewPage+1}</a>/{nbrpage+1}</p>
                        <div className='table-icon'>
                            <div className='arrow-right' onClick={(e)=>{ statepaginator[1]({...statepaginator[0],viewPage: (statepaginator[0].viewPage+1) > nbrpage ? 0 : statepaginator[0].viewPage+1}) }}/>
                        </div>
                    </div>
                    
                    </>
                }
            </div>
        </div>
    )
}
function FilterColumnDesc(obj){
    let defaultState = {...obj.state.listUser};
    let listUser = [...defaultState[0]];
    let field = obj.field;
    defaultState[1]([...listUser.sort((a,b) => a[field] < b[field])]);
}
function FilterColumnAscend(obj){
    let defaultState = {...obj.state.listUser};
    let listUser = [...defaultState[0]];
    let field = obj.field;
    defaultState[1]([...listUser.sort((a,b) => a[field] > b[field])]);
}

