/// <reference types="Cypress" />

describe("Characters", () => {
  beforeEach(() => {
    cy.server()
    cy.route({ method: "GET", url: "/api/people?page=1" }).as("getCharacters")
    cy.route({ method: "GET", url: "/api/people?page=2" }).as("getCharactersPage2")
    cy.visit("/login");
    cy.get("[formcontrolname='username']").type("Luke Skywalker");
    cy.get("form").submit();
    cy.url().should("include", "movies");
  });

  it("should list characters and open planet modal", () => {
    cy.get(".burger").click();
    cy.get("mat-sidenav").should("have.class", "mat-drawer-opened");
    cy.get(".sidenav-actions li").first().should("be.visible");
    cy.get(".sidenav-actions li").eq(1).click();
    cy.url().should("include", "characters");
    cy.get(".mat-drawer-backdrop").click()
    cy.get(".loading-wrapper").should("be.visible")

    cy.wait(["@getCharacters"])
    cy.get("mat-table").should("exist")
    cy.get("[aria-label='Ver planeta']").first().click();
    cy.get("mat-dialog-container").should("be.visible");
    cy.get("[aria-label='Fechar modal de planeta']").click();
    cy.get("mat-dialog-container").should("not.exist");

    cy.get("[aria-label='Next page']").click();
    cy.get(".loading-wrapper").should("be.visible")
    cy.wait(["@getCharactersPage2"])
    cy.get("mat-table").should("exist")
  });
});
