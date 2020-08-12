
/// <reference types="cypress" />

function selectMaterialDropDown(formControlName, selectOption) {
  cy.get(`[formcontrolname="${formControlName}"]`).click().then(() => {
    cy.get(`.cdk-overlay-container .mat-select-panel .mat-option-text`).should('contain', selectOption);
    cy.get(`.cdk-overlay-container .mat-select-panel .mat-option-text:contains("${selectOption}")`).first().click().then(() => {
      // After click, mat-select should contain the text of the selected option
      cy.get(`[formcontrolname="${formControlName}"]`).contains(selectOption);
    });
  });
}

describe("Routes test", () => {
  it("should visit Conversion page", () => {
    cy.visit("/");
    cy.url().should('include', '/conversion');
  });
});

describe("Conversion integration test", () => {
  it("should display 'correct' on correct payload", () => {
    cy.server();

    cy.route('POST', 'http://localhost:3000/api/v1/convert', {
      "status": 200,
      "message": "correct",
      "isSuccess": true
    }).as("api");

    cy.visit("/");
    cy.get('[formcontrolname=input]').type('100');
    selectMaterialDropDown('from', 'celsius');
    selectMaterialDropDown('to', 'fahrenheit');
    cy.get('[formcontrolname=studentResponse]').type('212');
    cy.get('form').submit(); 
    cy.wait('@api');
    cy.get('#output').contains('correct').should('be.visible');
  })

  it("should display 'incorrect' on incorrect payload", () => {
    cy.server();

    cy.route('POST','http://localhost:3000/api/v1/convert', {
      "status": 200,
      "message": "incorrect",
      "isSuccess": true
    }).as('api');

    cy.visit("/");
    cy.get('[formcontrolname=input]').type('100');
    selectMaterialDropDown('from', 'celsius');
    selectMaterialDropDown('to', 'fahrenheit');
    cy.get('[formcontrolname=studentResponse]').type('214');
    cy.get('form').submit(); 
    cy.wait('@api');
    cy.get('#output').contains('incorrect').should('be.visible'); 
  });

  it("should display 'invalid' on wrong unit mapping", () => {
    cy.server();

    cy.route('POST','http://localhost:3000/api/v1/convert', {
      "status": 200,
      "message": "invalid",
      "isSuccess": false
    }).as('api');

    cy.visit("/");
    cy.get('[formcontrolname=input]').type('100');
    selectMaterialDropDown('from', 'celsius');
    selectMaterialDropDown('to', 'liters');
    cy.get('[formcontrolname=studentResponse]').type('214');
    cy.get('form').submit(); 
    cy.wait('@api');
    cy.get('#output').contains('invalid').should('be.visible');
  });

  it("should display 'invalid' on wrong data entry", () => {
    cy.visit("/");

    cy.server();

    cy.route('POST','http://localhost:3000/api/v1/convert', {
      "status": 200,
      "message": "invalid",
      "isSuccess": false
    }).as('api');

    cy.get('[formcontrolname=input]').type('dog');
    selectMaterialDropDown('from', 'celsius');
    selectMaterialDropDown('to', 'liters');
    cy.get('[formcontrolname=studentResponse]').type('214');
    cy.get('form').submit(); 
    cy.wait('@api');
    cy.get('#output').contains('correct').should('not.exist');
    cy.get('#output').contains('invalid').should('exist');
    cy.get('#output').contains('incorrect').should('not.exist');
  });

});
