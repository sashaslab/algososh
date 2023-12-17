import { CIRCLE, INPUT } from "../../src/constants/element-captions";

describe('E2E testing string', () => {
    beforeEach(() => {
        cy.visit('/recursion');
        cy.get(INPUT).as('input')
        cy.get('button[type="submit"]').as('button');

    })

    it('Checking that if the input is empty, then the add button is not available', () => {
        cy.get('@input').should('be.empty');
        cy.get('@button').should('be.disabled')
    })

    it('Check that the string is expanded correctly', () => {
        cy.get('@input').type('Hello')
        cy.get('@button').should('not.be.disabled').click()
        cy.get(CIRCLE).as('circle')
        cy.get('@circle').eq(0).should('contain', 'H').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(1).should('contain', 'e').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(2).should('contain', 'l').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(3).should('contain', 'l').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(4).should('contain', 'o').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(0).should('contain', 'o').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle').eq(1).should('contain', 'e').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(2).should('contain', 'l').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(3).should('contain', 'l').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(4).should('contain', 'H').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle').eq(0).should('contain', 'o').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle').eq(1).should('contain', 'l').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle').eq(2).should('contain', 'l').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle').eq(3).should('contain', 'e').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle').eq(4).should('contain', 'H').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
    })
})

