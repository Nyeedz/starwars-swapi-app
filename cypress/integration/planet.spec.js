/// <reference types="Cypress" />

describe("Planet", () => {
  beforeEach(() => {
    cy.server();
    cy.route({ method: "GET", url: "/api/people" }).as("getPeople");
    cy.visit("/login");
    cy.get("[formcontrolname='username']").type("Luke Skywalker");
    cy.get("form").submit();
    cy.url().should("include", "movies");
  });

  // it("should open planet modal", () => {
  //   cy.wait(["@getPeople"]);
  //   cy.get(".burger").click();
  //   cy.get("mat-sidenav").should("have.class", "mat-drawer-opened");
  //   cy.get(".sidenav-actions li").first().should("be.visible");
  //   cy.get(".sidenav-actions li").eq(1).click();
  //   cy.url().should("include", "characters");
  //   cy.get(".mat-drawer-backdrop").click();
  //   cy.get("[aria-label='Ver planeta']").click();
  // });
});
