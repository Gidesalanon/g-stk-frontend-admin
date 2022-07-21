import React from 'react';

import Chance from 'chance';
import { Button } from 'reactstrap';

const chance = new Chance();

export const formatDataTable = datas =>{
return  datas.map(item =>({...item,_id : chance.guid()}))
}

export const formatDataColumns = data =>{
    const columns = [];
  const sample = data[0];
  Object.keys(sample).forEach(key => {
    if (key !== "_id") {
      columns.push({
        accessor: key,
        Header: key
      });
    }
  });
  columns.push({
		id: 'actions',
    accessor: 'id',
    Header:'Actions',
    Cell: ({value}) => (
      <>
    <Button outline color="info"  onClick={()=>{console.log('clicked value', value)}}>Editer</Button> {"   "}
    <Button outline color="danger" onClick={()=>{console.log('clicked value', value)}}>Supprimer</Button>
    </>
  )
})
  return columns;
}

export const selectedRows = (key,selections=[]) => {
  const keyIndex = selections.indexOf(key);
  // check to see if the key exists
  if (keyIndex >= 0) {
    selections = [
      ...selections.slice(0, keyIndex),
      ...selections.slice(keyIndex + 1)
    ];
  } else {
    selections.push(key);
  }
  return selections
};
