import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Electro Cool Express API with Swagger",
      version: "0.1.0",
      description:
        "API to manage the job orders, customers, invoices, and other data for a Electro Cool.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["../routes/*.ts"],
};

export default swaggerJsdoc(options);
