// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("https://rickandmortyapi.com/api/character/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
          name: "Earth (C-137)",
          url: "",
        },
        location: {
          name: "Earth (Replacement Dimension)",
          url: "",
        },
        image: "/rick.png",
        episode: ["https://rickandmortyapi.com/api/episode/1"],
        url: "",
        created: "",
      }),
    );
  }),
  rest.get("https://rickandmortyapi.com/api/episode/1", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: "Pilot",
      }),
    );
  }),
];
