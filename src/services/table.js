export function table_headers(data) {
  if (!data) {
    return [];
  }
  return [
    "organisation",
    "data",
    ...data.metaData.dimensions.pe.map((pe) => data.metaData.items[pe].name)
  ];
}

export function table_rows(data) {
  if (!data) {
    return [];
  }
  return data.metaData.dimensions.ou.reduce((x, ou) => {
    const fr = data.metaData.dimensions.dx.map((dx) => {
      return {
        organisation: data.metaData.items[ou].name,
        data: data.metaData.items[dx].name,
        ...data.metaData.dimensions.pe.reduce((k, pe) => {
          k[data.metaData.items[pe].name] = data.rows.filter((t) => {
            return t[0] === dx && t[1] === pe && t[2] === ou;
          })[0]?.[3];
          return k;
        }, {})
      };
    });
    x.push(...fr);
    return x;
  }, []);
}
