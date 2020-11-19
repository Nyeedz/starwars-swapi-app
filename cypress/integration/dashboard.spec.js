/// <reference types="Cypress" />

describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("[formcontrolname='username']").type("Luke Skywalker");
    cy.get("form").submit();
    cy.url().should("include", "movies");
  });

  it("should open side menu", () => {
    cy.get(".burger").click();
    cy.get("mat-sidenav").should("have.class", "mat-drawer-opened");
    cy.get(".sidenav-actions li").first().should("be.visible");
  });

  it("should navigate to characters page", () => {
    cy.get(".burger").click();
    cy.get("mat-sidenav").should("have.class", "mat-drawer-opened");
    cy.get(".sidenav-actions li").first().should("be.visible");
    cy.get(".sidenav-actions li").eq(1).click();
    cy.url().should("include", "characters");
  });

  it("should logout and navigato to login", () => {
    cy.get(".burger").click();
    cy.get("mat-sidenav").should("have.class", "mat-drawer-opened");
    cy.get(".sidenav-actions li").first().should("be.visible");
    cy.get(".sidenav-actions li").eq(2).click();
    cy.url().should("include", "login");
  })
});
