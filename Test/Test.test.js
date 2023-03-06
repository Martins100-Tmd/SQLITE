const url = "http://localhost:8080/api";

const GET = async (method) => {
  const A = await fetch(url + "/get", { method });
  const B = await A.json();
  const C = await B;
  return C;
};
test("test the get request", () => {
  expect(typeof GET("GET")).toBe("object");
});
