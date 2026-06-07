export async function getEvents() {
  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSeOtc-wh6amahFVCZqn7oXXAwNgM_B9rwRzH8kzVxH2lATSnokc6d4I6tW_wpW4WDjRqaR_r4iksX5/pub?gid=0&single=true&output=csv";

  const response = await fetch(SHEET_URL);
  const csv = await response.text();

  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines
    .slice(1)
    .map((line) => {
      const values = line.split(",").map((v) => v.trim());

      return Object.fromEntries(
        headers.map((header, index) => [header, values[index] ?? ""])
      );
    })
    .filter((event: any) => event.published?.toUpperCase() === "TRUE");
}