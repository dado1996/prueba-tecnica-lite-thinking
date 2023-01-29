import React from "react";

const styles = {
  table: {
    border: '1px solid steelblue',
    marginTop: 15,
  },
  header: {
    borderBottom: 'solid 3px red',
    background: 'aliceblue',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cells: {
    padding: '10px',
    border: 'solid 1px gray',
    background: 'papayawhip',
    color: 'black',
  },
}

function InventoryTable({ r }) {
  const data = r;
  const columns = [
    {
      Header: 'Name',
      accesor: 'name'
    },
    {
      Header: 'Amount',
      accesor: 'amount'
    },
    {
      Header: 'Unit',
      accesor: 'unit'
    },
    {
      Header: 'Business',
      accesor: 'Business'
    },
  ];
  
  return (
    <table
      style={styles.table}
    >
      <thead>
        <tr >
          {
            columns.map((column, i) => (
              <th
                key={i}
                style={styles.header}
              >
                {column.Header}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          data.map((row, i) => {
            return (
              <tr key={i}>
                <td
                  style={styles.cells}
                >{row.name}</td>
                <td
                  style={styles.cells}
                >{row.amount}</td>
                <td
                  style={styles.cells}
                >{row.unit}</td>
                <td
                  style={styles.cells}
                >{row.business_ref.name}</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default InventoryTable;