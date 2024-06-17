import React from 'react';
import LoopIcon from './../../src/assets/icon/loop-svgrepo-com.svg';

export function InputTextCustom( props ) {
    return (
        <div className='input-search input-search-min'>
            <img src={LoopIcon} />
            <input type='text' onChange={(e)=> props.onChange(e)} placeholder={props.placeholder}/>
        </div>
    );
}
export function InputTextCustomGlobal( props ) {
    return (
        <div className='table-thead'>
            <div className='input-search '>
                <img src={LoopIcon} />
                <input type='text' onChange={(e)=> props.onChange(e)} placeholder={props.placeholder}/>
                </div>
        </div>
    );
}