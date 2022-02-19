function TableHeader({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((h) => (
          <th>{h}</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
