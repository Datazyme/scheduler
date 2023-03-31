/* eslint-disable no-undef */
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should visit tuesday using css", () => {
    cy.visit("/");
    cy.contains("li", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
