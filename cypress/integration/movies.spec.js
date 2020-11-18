/// <reference types="Cypress" />

describe("Movies", function () {
  beforeEach(() => {
    cy.server();
    cy.route({ method: "GET", url: "/api/films" }).as("getMovie");
    cy.visit("/login");
    cy.get("[formcontrolname='username']").type("Luke Skywalker");
    cy.get("form").submit();
    cy.url().should("include", "movies");
    cy.fixture("movie.json").then((movie) => {
      this.movie = movie;
    });
  });

  it("should change tab", () => {
    cy.get(".movies-header a").last().click();
    cy.get(".movies-header a").first().should("not.have.class", "active");
    cy.get(".movies-header a").last().should("have.class", "active");
  });

  it("should set and unset movie as watched", () => {
    cy.wait(["@getMovie"]);
    cy.get(".movies-card-wrapper")
      .find("movie-card")
      .first()
      .find(".mat-icon-button")
      .contains("visibility")
      .click();

    cy.get(".movies-card-wrapper")
      .find("movie-card")
      .first()
      .find(".mat-icon-button")
      .should("have.text", "visibility_off");

    cy.get(".movies-card-wrapper")
      .find("movie-card")
      .first()
      .find(".mat-icon-button")
      .contains("visibility_off")
      .click();

    cy.get(".movies-card-wrapper")
      .find("movie-card")
      .first()
      .find(".mat-icon-button")
      .should("have.text", "visibility");
  });

  it("should add and remove movie", () => {
    cy.get("[aria-label='add']").click();
    cy.get("[formcontrolname='title']").type(this.movie.create.title);
    cy.get("[formcontrolname='director']").type(this.movie.create.director);
    cy.get("[formcontrolname='producer']").type(this.movie.create.producer);
    cy.get("[formcontrolname='cover']").type(this.movie.create.cover);
    cy.get("[formcontrolname='opening_crawl']").type(
      this.movie.create.opening_crawl
    );
    cy.get("[formcontrolname='characters']").click();
    this.movie.create.characters.forEach((character) => {
      cy.get(`[ng-reflect-value='${character}']`).click();
    });

    cy.get("form").submit();
    cy.get(".snackbar-background").contains("cadastrado").should("be.visible");
    cy.get(".movies-header a")
      .contains("Filmes adicionados", {
        matchCase: false,
      })
      .click();

    cy.get(".movie-card-header")
      .contains(this.movie.create.title)
      .should("exist")
      .parent()
      .find(".mat-icon-button")
      .contains("edit", { matchCase: false })
      .click();

    cy.get("[formcontrolname='title']")
      .invoke("val")
      .then((fieldValue) =>
        expect(fieldValue).to.be.equal(this.movie.create.title)
      );
    cy.get("[formcontrolname='title']").clear().type(this.movie.edited.title);
    cy.get("[formcontrolname='director']")
      .invoke("val")
      .then((fieldValue) =>
        expect(fieldValue).to.be.equal(this.movie.create.director)
      );
    cy.get("[formcontrolname='director']")
      .clear()
      .type(this.movie.edited.director);
    cy.get("[formcontrolname='producer']")
      .invoke("val")
      .then((fieldValue) =>
        expect(fieldValue).to.be.equal(this.movie.create.producer)
      );
    cy.get("[formcontrolname='producer']")
      .clear()
      .type(this.movie.edited.producer);

    cy.get("[formcontrolname='opening_crawl']")
      .invoke("val")
      .then((fieldValue) =>
        expect(fieldValue).to.be.equal(this.movie.create.opening_crawl)
      );
    cy.get("[formcontrolname='opening_crawl']")
      .clear()
      .type(this.movie.edited.opening_crawl);

    cy.get("form").submit();
    cy.get(".snackbar-background").contains("editado").should("be.visible");

    cy.get(".movie-card-header")
      .contains(this.movie.edited.title)
      .should("exist")
      .parent()
      .find(".mat-icon-button")
      .contains("delete", { matchCase: false })
      .click()
      .should("not.exist");
  });

  it("should open and close details modal", () => {
    cy.get("[aria-label='Detalhes do filme']").click();
    cy.get("mat-dialog-container").should("be.visible");
    cy.get("[aria-label='Fechar modal de detalhes']").click();
    cy.get("mat-dialog-container").should("not.exist");
    cy.get(".mat-drawer-backdrop").click();
    cy.get("[aria-label='Ver planeta']").click();
  });
});
