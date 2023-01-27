import { Button } from "@mui/material";
import { collection, query, onSnapshot, limit } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useTable } from "react-table";
import { database } from "../../lib/firebase";
import BusinessForm from "./BusinessForm";

const businessStyles = {
  margin: 20,
};

function Business() {
  const columns = useMemo(() => [
    {
      Header: 'NIT',
      accesor: 'col1'
    },
    {
      Header: 'Name',
      accesor: 'col2'
    },
    {
      Header: 'Address',
      accesor: 'col3'
    },
    {
      Header: 'Phone',
      accesor: 'col4'
    },
  ], []);
  const collectionRef = collection(database, 'business');
  const businessQuery = query(collectionRef, limit(1000));
  const rowsData = useMemo(() => {
    let dataArray = [];

    onSnapshot(businessQuery, (data) => {
      dataArray = data.docs.map(item => {
        const row = item.data();
        return {
          col1: row.nit,
          col2: row.name,
          col3: row.address,
          col4: row.phone
        };
      });
    });

    return dataArray;
  }, [businessQuery]);
  console.log(rowsData);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: rowsData });
  const [show, setShow] = useState(false);
  
  const handleShow = () => {
    setShow(!show);
  }

  return (
    <div style={businessStyles}>
      <Button style={{ display: !show ? 'block' : 'none' }} variant="outlined" onClick={handleShow}>Show form</Button>
      <BusinessForm showForm={show} setShowForm={setShow} />

      <div>
        <table {...getTableProps()} style={{ border: '1px solid steelblue', marginTop: 15 }}>
          <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: 'solid 3px red',
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}
                    >
                      {column.render('Header')}
                    </th>
                  ))
                }
              </tr>
            ))
          }
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map(cell => {
                        return (
                          <td
                            {...cell.getCellProps()}

                            style={{
                              padding: '10px',
                              border: 'solid 1px gray',
                              background: 'papayawhip',
                              color: 'black',
                            }}
                          >
                            {
                              cell.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Business;