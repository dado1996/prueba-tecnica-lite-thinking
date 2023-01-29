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

/**
 * The table component to display the list of
 * businesses
 * @author Diego Delgado
 * @param {Objecto} props
 * @param {Object} props.data The data to display
 * @returns The component of the business table
 */
function BusinessTable({ data }) {
  const columns = [
    {
      Header: 'NIT',
      accesor: 'nit'
    },
    {
      Header: 'Name',
      accesor: 'name'
    },
    {
      Header: 'Address',
      accesor: 'address'
    },
    {
      Header: 'Phone',
      accesor: 'phone'
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
                >{row.nit}</td>
                <td
                  style={styles.cells}
                >{row.name}</td>
                <td
                  style={styles.cells}
                >{row.address}</td>
                <td
                  style={styles.cells}
                >{row.phone}</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default BusinessTable;