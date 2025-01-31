function pagination({skip, limit}) {
  return `OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY`;
}

function filterData({filter, columns, condition = []}) {
  const filterString = filter.replace(`'`, `''`).replace(`[`, `[[]`);
  columns.forEach((column) => {
    condition.push(`${column} LIKE '%${filterString}%'`);
  });
  return condition;
}

function uniqueOdWhPriceException() {
  return `
    SELECT * FROM ( SELECT
      ODWhPrcExc_Cust_Key as ODWhPrcExc_Cust_Key_1,
      ODWhPrcExc_ProdPkg_Key as ODWhPrcExc_ProdPkg_Key_1,
      max(ODWhPrcExc_Eff_DateTime) as updatedTime,
      max(ODWhPrcExc_Key) as ODWhPrcExc_Key_1
      FROM OD_Wh_Price_Exceptions
      GROUP BY ODWhPrcExc_Cust_Key, ODWhPrcExc_ProdPkg_Key
     ) uniqueOrdPrcExc
     LEFT JOIN OD_Wh_Price_Exceptions on
     uniqueOrdPrcExc.ODWhPrcExc_Key_1 = OD_Wh_Price_Exceptions.ODWhPrcExc_Key`;
}

module.exports = {
  pagination,
  filterData,
  uniqueOdWhPriceException,
};
