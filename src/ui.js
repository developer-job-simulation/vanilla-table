import {fetchCompanies} from "./api";
import {
  ACCOUNT_EXECUTIVE_FIELD_NAME,
  COMPANIES_TABLE_HEADERS,
  COMPANY_NAME_FIELD_NAME,
  CREATED_AT_FIELD_NAME,
  REVENUE_YTD_FIELD_NAME,
  STATUS_FIELD_NAME
} from "./constants";

function format2Digits(num) {
  return num.toString().padStart(2, '0');
}

export const makeTable = async () => {
  const companies = await fetchCompanies();
  // Print result of api call to the developer console
  // Uncomment if you need it for debugging.
  // While this method of logging variables of interest to the console is primitive, but often highly valuable debugging technique
  // console.log(companies);



  // Initialize new array and push a header row
  const companiesToDisplay = [];
  companiesToDisplay.push(COMPANIES_TABLE_HEADERS);

  // Here we simply rearrange company fields in the order in which we want to display them in UI
  companies.map(company => {

    // Convert date format from ISO 8601 to hh:mm
    // const date = new Date((company[CREATED_AT_FIELD_NAME]).slice(0, -1));
    // const time = new Date(date.getTime());
    // const hours = time.getHours();
    // const minutes = time.getMinutes();
    // const convertedTime = `${format2Digits(hours)}:${format2Digits(minutes)}`;
    const formattedTime = (company[CREATED_AT_FIELD_NAME]).slice(11, 16);

    const row = [];
    row.push(
      company[COMPANY_NAME_FIELD_NAME],
      company[STATUS_FIELD_NAME],
      formattedTime,
      company[REVENUE_YTD_FIELD_NAME],
      company[ACCOUNT_EXECUTIVE_FIELD_NAME]
    );
    companiesToDisplay.push(row);
  });

  // Programmatically create html table
  const table = document.createElement("table");
  document.body.appendChild(table); // Drew the main table node on the document

  companiesToDisplay.forEach(row => {
    const tr = table.insertRow(); //Create a new row

    row.forEach(column => {
      const td = tr.insertCell();
      td.innerText = column; // Take string from placeholder variable and append it to <tr> node
    });
  });
};