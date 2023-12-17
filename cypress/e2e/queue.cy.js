import { CIRCLE, INPUT } from "../../src/constants/element-captions";

describe('E2E testing queue', () => {
    beforeEach(() => {
        cy.visit('/queue');
        cy.get('button').contains('Добавить').as('add');
        cy.get('button').contains('Удалить').as('delete');
        cy.get('button').contains('Очистить').as('clear');
        cy.get(INPUT).as('input')
        cy.get(CIRCLE).as('circle')
        cy.get('[data-testid="head"]').as('head')
        cy.get('[data-testid="tail"]').as('tail')
    })
    it('Checking that if the input is empty, then the add button is not available.', () => {
        cy.get('@input').should('be.empty');
        cy.get('@add').parent().should('be.disabled')
    })
    it('Checking whether an element is added to the queue correctly', () => {
        cy.get('@input').type(1)
        cy.get('@add').click()
        cy.get('@circle').eq(0).should('contain', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@head').eq(0).should('contain', 'head')
        cy.get('@tail').eq(0).should('contain', 'tail')
        cy.get('@circle').eq(0).should('contain', '1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@input').type(2)
        cy.get('@add').click()
        cy.get('@circle').eq(1).should('contain', '2').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@head').eq(0).should('contain', 'head')
        cy.get('@tail').eq(0).should('contain', '')
        cy.get('@tail').eq(1).should('contain', 'tail')
        cy.get('@circle').eq(1).should('contain', '2').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })
    it('Checking whether an element was removed from the queue correctly.', () => {
        cy.get('@input').type(1)
        cy.get('@add').click()
        cy.get('@input').type(2)
        cy.get('@add').click()
        cy.get('@delete').click()
        cy.get('@circle').eq(0).should('contain', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(0).should('contain', '').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@head').eq(0).should('contain', '')
        cy.get('@head').eq(1).should('contain', 'head')
        cy.get('@tail').eq(1).should('contain', 'tail')
    })
    it('Checking the behavior of the “Clear” button.', () => {
        cy.get('@input').type(1)
        cy.get('@add').click()
        cy.get('@input').type(2)
        cy.get('@add').click()
        cy.get('@clear').click()
        cy.get('@circle').eq(0).should('contain', '')
        cy.get('@circle').eq(1).should('contain', '')
    })
})