import reducer, { addFavorite, removeFavorite } from "../favoritesSlice";

describe("Favorites Reducer", () => {
  test("should return the initial state based on localstorage", () => {
    expect(reducer(undefined, {})).toEqual({ favorites: [] });
  });

  test("can add a favorite to the store", () => {
    const previousState = { favorites: [] };
    expect(reducer(previousState, addFavorite({ id: 1, val: "A" }))).toEqual({
      favorites: [{ id: 1, val: "A" }],
    });
  });

  test("can remove a favorite from the store", () => {
    const previousState = { favorites: [{ id: 1, val: "A" }, { id: 2, val: "B" }, { anotherId: 77, val: "QWER" }, { id: 3, val: "C" }] };
    expect(
      reducer(
        previousState,
        removeFavorite({ item: { id: 3, val: "C" }, idKey: "id" })
      )
    ).toEqual({
      favorites: [{ id: 1, val: "A" }, { id: 2, val: "B" }, { anotherId: 77, val: "QWER" }],
    });
  });
});
