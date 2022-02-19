function TableRows({ headers, rows }) {
  return (
    <tbody>
      {rows.map((r) => {
        return (
          <tr>
            {headers.map((h) => (
              <td>{r[h]}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableRows;
