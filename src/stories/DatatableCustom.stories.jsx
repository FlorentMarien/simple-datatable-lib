import { ColumnCustom, DatatableCustom } from './../components/DatatableCustom';
import iconAdd from "./../assets/icon/add-circle-svgrepo-com.svg";
import React from 'react';

const column1 = (<ColumnCustom field='Name' />);
const column2 = (<ColumnCustom field='LastName' />);
const column3 = (<ColumnCustom field='City' />);
let multiColumn = [column1,column2,column3];
let buttonAdd = (
  <div className='container-button'>
      <img src={iconAdd} />
      <button className="button-add" onClick={(e)=>{ alert("AddElement") }}>
          <p>Ajouter</p>
      </button>
  </div>
);
let args;
/*
export default {
  tags: ['autodocs'],
  render: (args) => (
    <DatatableCustom {...args}>
      {multiColumn}
    </DatatableCustom>
  )
}*/
export const Base = {
  args:{ 
  },
  render: (args) => (
    <DatatableCustom {...args}>
      {multiColumn}
    </DatatableCustom>
  )
}
export const searchGlobal = {
  args: {
    searchGlobal: true,
    data:[
      {
        Name:"Florent",
        LastName:"Marien",
        City:"Lille",
        DateofBirth: "2024-06-27T09:46:53.647Z"
      },
      {
        Name:"John",
        LastName:"Doe",
        City:"Paris",
        DateofBirth: "1997-05-23T09:46:53.647Z"
      },
      {
        Name:"Tony",
        LastName:"Stark",
        City:"NY",
        DateofBirth: "1979-04-20T09:46:53.647Z"
      }
    ], 
  },
  render: (args) => (
    <DatatableCustom {...args}>
      {multiColumn}
    </DatatableCustom>
  )
}
export const emptyData = {
  render: (args) => (
    <DatatableCustom>
      {multiColumn}
    </DatatableCustom>
  )
}
export const addElement = {
  args: { 
    addElement: buttonAdd,
  },
  render: (args) => (
    <DatatableCustom {...args}>
      {multiColumn}
    </DatatableCustom>
  )
}
export const searchGlobalandaddElement = {
  args: {
    searchGlobal: true,
    addElement: buttonAdd,
  },
  render: (args) => (
    <DatatableCustom {...args}>
      {multiColumn}
    </DatatableCustom>
  )
}

export const paginator = {
  args: {
    paginator:[5,10,20,50,100]
  },
  render: (args) => (
    <DatatableCustom {...args}>
      {multiColumn}
    </DatatableCustom>
  )
}

export default {
  component: DatatableCustom,
  tags:['autodocs'],
  args: {
    addElement:<></>,
    searchGlobal:false,
    paginator:[10],
    data:[
      {
        Name:"Florent",
        LastName:"Marien",
        City:"Lille",
        DateofBirth: "2024-06-27T09:46:53.647Z"
      },
      {
        Name:"John",
        LastName:"Doe",
        City:"Paris",
        DateofBirth: "1997-05-23T09:46:53.647Z"
      },
      {
        Name:"Tony",
        LastName:"Stark",
        City:"NY",
        DateofBirth: "1979-04-20T09:46:53.647Z"
      }
    ], 
  },
  argTypes: {
    searchGlobal: {
      defaultValue: { summary: false }
    },
    paginator: {
      defaultValue: { summary: "[10]" }
    },
  },
  render: (args) => (
    <DatatableCustom >
      {multiColumn}
    </DatatableCustom>
  )
}

/*const meta = {
  component: DatatableCustom,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: '',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: { id:"idDatatable",searchGlobal:false , paginator:[5,10,20], addElement: buttonAdd},
  render: (args) => (
    <DatatableCustom {...args}>
      {multiColumn}
    </DatatableCustom>
  )
};*/

//export default meta;
//export const Default = {};