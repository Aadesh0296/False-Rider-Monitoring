import React from 'react';

const DataTable = ({ data }) => {
  return (
    <table>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.label}</td>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
