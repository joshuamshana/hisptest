import { table_headers, table_rows } from "./table";
import data from "../data/hisp";

describe("TableService", function () {
  describe("table_headers", function () {
    it("should return empty if data is not passed", () => {
      expect(table_headers()).toEqual([]);
    });
    it("should return formatted table headers", () => {
      const t_headers = table_headers(data);
      expect(t_headers).toEqual([
        "organisation",
        "data",
        ...data.metaData.dimensions.pe.map((pe) => data.metaData.items[pe].name)
      ]);
    });
    it("sort header dates asc", () => {
      const filteredH = table_headers(data).filter(
        (x) => x !== "organisation" && x !== "data"
      );
      expect(filteredH[0]).toBe("August 2021");
      expect(filteredH[1]).toBe("September 2021");
      expect(filteredH[2]).toBe("October 2021");
      expect(filteredH[3]).toBe("November 2021");
      expect(filteredH[4]).toBe("December 2021");
      expect(filteredH[5]).toBe("January 2022");
    });
  });

  describe("table_rows", function () {
    it("should return empty if data not passed", () => {
      expect(table_rows()).toEqual([]);
    });
    it("should return formatted data of the first row", () => {
      expect(table_rows(data)[0]).toEqual({
        data: "ANC 1 Coverage",
        organisation: "Bo",
        "August 2021": "147.1",
        "November 2021": "193.3",
        "December 2021": "110.9",
        "January 2022": "129.6",
        "October 2021": "144.6",
        "September 2021": "169.9"
      });
    });
    it("should return total number of data row", () => {
      expect(table_rows(data)).toHaveLength(
        data.metaData.dimensions.ou.length * data.metaData.dimensions.dx.length
      );
    });
    it("should return total length of unique organisation name", () => {
      expect(
        table_rows(data).reduce((a, b) => {
          a.add(b.organisation);
          return a;
        }, new Set()).size
      ).toBe(6);
    });
    it("should return total length of unique data name", () => {
      expect(
        table_rows(data).reduce((a, b) => {
          a.add(b.data);
          return a;
        }, new Set()).size
      ).toBe(3);
    });
  });

  it("should match headers from header array and object of the rows", () => {
    expect(table_headers(data)).toEqual(Object.keys(table_rows(data)[0]));
  });
});
