import { formatDateTime, formatLocalDateTime } from "../format-date";

describe("DateFormatters", () => {
  test("it should be able to parse a UTC String", () => {
    const formattedDate = formatLocalDateTime("2020-12-19T11:05:00+02:00");
    expect(formattedDate).toEqual(
      "Saturday, December 19, 2020 11:05:00 GMT +02:00"
    );
  });

  test("Date only string is formatted with the default formatter", () => {
    //time is assumed to be absolutely set to midnight when missing in the UTC string
    const formattedDate = formatLocalDateTime("2020-12-19");
    expect(formattedDate).toEqual(formatDateTime("2020-12-19"));
  });

  test("local and default datetime formatters are consistent in behaviour regarding null inputs", () => {
    const formattedDate1 = formatLocalDateTime(null);
    expect(formattedDate1).toEqual(formatDateTime(null));
  });
});
