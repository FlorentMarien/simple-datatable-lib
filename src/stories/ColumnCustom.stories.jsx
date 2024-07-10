import React, { Children } from 'react';

import { DatatableCustom,ColumnCustom } from './../components/DatatableCustom';
let args;
let data = [
  {
    Name:"Florent",
    LastName:"Marien",
    City:"Lille",
    DateofBirthFR: "2024-06-27T09:46:53.647Z",
    DateofBirthUS: "2024-06-27T09:46:53.647Z"
  },
  {
    Name:"John",
    LastName:"Doe",
    City:"Paris",
    DateofBirthFR: "1997-05-23T09:46:53.647Z",
    DateofBirthUS: "2024-06-27T09:46:53.647Z"
  },
  {
    Name:"Tony",
    LastName:"Stark",
    City:"NY",
    DateofBirthFR: "1979-04-20T09:46:53.647Z",
    DateofBirthUS: "2024-06-27T09:46:53.647Z"
  }
];
let x = 0;
export default {
  component: DatatableCustom,
  tags: ['autodocs'],
};
/*
export const Base = {
  
  args:{
    Name:{field:"Name",search:false,sortable:false},
    LastName:{field:"LastName",search:false,sortable:false},
    DateofBirthFR:{field:"DateofBirthFR",search:false,sortable:false,dataType:"date",formatdateType:"fr-FR"},
    DateofBirthUS:{field:"DateofBirthUS",search:false,sortable:false,dataType:"date",formatdateType:"en-US"},
    data:[
      {
        Name:"Florent",
        LastName:"Marien",
        City:"Lille",
        DateofBirthFR: "2024-06-27T09:46:53.647Z",
        DateofBirthUS: "2024-06-27T09:46:53.647Z"
      },
      {
        Name:"John",
        LastName:"Doe",
        City:"Paris",
        DateofBirthFR: "1997-05-23T09:46:53.647Z",
        DateofBirthUS: "2024-06-27T09:46:53.647Z"
      },
      {
        Name:"Tony",
        LastName:"Stark",
        City:"NY",
        DateofBirthFR: "1979-04-20T09:46:53.647Z",
        DateofBirthUS: "2024-06-27T09:46:53.647Z"
      }
    ],
  },
  render: (args) => (
    <DatatableCustom data={data}>
      <ColumnCustom {...args.Name}/>
      <ColumnCustom {...args.LastName}/>
      <ColumnCustom {...args.DateofBirthFR}/>
      <ColumnCustom {...args.DateofBirthUS}/>
    </DatatableCustom>
    
  ),
}*/
export const Base = {
  args:{
    field:"DateofBirthFR",search:false,sortable:false,dataType:"date",formatdateType:"fr-FR",
  },
  argTypes: {
    search: {
      defaultValue: { summary: false }
    },
    sortable: {
      defaultValue: { summary: false }
    },
    dataType: {
      control: 'radio',
      options: ['string', 'date'],
      table: {
          defaultValue: { summary: 'string' }
      }
    },
    formatdateType: {
      defaultValue: { summary: "default: en-US / errorTag: en-US" }
    },
  },
  render: (args) => (
    <DatatableCustom data={data}>
      <ColumnCustom {...args}/>
    </DatatableCustom>
    
  ),
}
export const Empty = {
  render: (args) => (
    <DatatableCustom />
  ),
};

export const OneColumn = {
  args:[{field:"Name"}],
  render: (args) => (
    <DatatableCustom data={data}>
      <ColumnCustom {...args[x]}/>
    </DatatableCustom>
  ),
};

export const MultiColumn = {
  args:[
    {field:"Name"},
    {field:"LastName"},
    {field:"City"}
  ],
  render: (args) => (
    <DatatableCustom data={data}>
      <ColumnCustom {...args[x]}/>
      <ColumnCustom {...args[x+1]}/>
      <ColumnCustom {...args[x+2]}/>
    </DatatableCustom>
  ),
};
export const SearchColumn = {
  args:[
    {field:"Name", search:true},
    {field:"LastName"},
    {field:"City"}
  ],
  render: (args) => (
    <DatatableCustom data={data} >
      <ColumnCustom {...args[x]}/>
      <ColumnCustom {...args[x+1]}/>
      <ColumnCustom {...args[x+2]}/>
    </DatatableCustom>
  ),
};
export const SortableColumn = {
  args:[
    {field:"Name", sortable:true},
    {field:"LastName"},
    {field:"City"}
  ],
  render: (args) => (
    <DatatableCustom data={data}>
      <ColumnCustom {...args[x]}/>
      <ColumnCustom {...args[x+1]}/>
      <ColumnCustom {...args[x+2]}/>
    </DatatableCustom>
  ),
};
export const ColumnDate = {
  args:[
    {field:"Name"},
    {field:"LastName"},
    {field:"DateofBirthFR",dataType:"date",formatdateType:"fr-FR"},
    {field:"DateofBirthUS",dataType:"date",formatdateType:"en-US"},
  ],
  render: (args) => (
    <DatatableCustom data={data}>
      <ColumnCustom {...args[x]}/>
      <ColumnCustom {...args[x+1]}/>
      <ColumnCustom {...args[x+2]}/>
      <ColumnCustom {...args[x+3]}/>
    </DatatableCustom>
  ),
};
