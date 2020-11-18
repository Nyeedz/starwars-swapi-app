/// <reference types="Cypress" />

describe("Login", () => {
  it("should login", () => {
    cy.visit("/login");
    cy.get("[formcontrolname='username']").type("Luke Skywalker");
    cy.get("form").submit();
    cy.url().should("include", "movies");
  });
});
