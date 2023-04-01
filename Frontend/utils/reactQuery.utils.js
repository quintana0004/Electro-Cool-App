export function transformData(data, transformation, ...args) {
  return {
    ...data,
    pages: data.pages.map((page) => {
      return {
        ...page,
        data: {
          ...page.data,
          data: page.data.data.map((item) => {
            return {
              ...transformation(item, args),
            };
          }),
        },
      };
    }),
  };
}

export function getFlattenedData(data) {
  let tableData = [];

  console.log("Data Flattened Before: ", data.pages[0].data);
  for (const items of data.pages.map((p) => p.data).flat()) {
    tableData.push(...items.data);
  }

  return tableData;
}
