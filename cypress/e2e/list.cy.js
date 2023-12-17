import { CIRCLE } from '../../src/constants/element-captions'

describe('E2E testing list', () => {
    beforeEach(() => {
        cy.visit('/list');
        cy.get('[class^=list-page_enter_value]').as('formEnterValue')
        cy.get('[class^=list-page_enter_index]').as('formEnterIndex')
        cy.get('@formEnterValue').find('[class^=input_input]').as('inputValue')
        cy.get('@formEnterValue').find('button').contains('Добавить в head').as('addHead')
        cy.get('@formEnterValue').find('button').contains('Добавить в tail').as('addTail')
        cy.get('@formEnterValue').find('button').contains('Удалить из head').as('deleteHead')
        cy.get('@formEnterValue').find('button').contains('Удалить из tail').as('deleteTail')
        cy.get('@formEnterIndex').find('[class^=input_input]').as('inputIndex')
        cy.get('@formEnterIndex').find('button').contains('Добавить по индексу').as('addIndex')
        cy.get('@formEnterIndex').find('button').contains('Удалить по индексу').as('deleteIndex')
        cy.get(CIRCLE).as('circle')
        cy.get('[data-testid="head"]').as('head')
        cy.get('[data-testid="tail"]').as('tail')
    })
    it('Checking that if the input is empty, then the add button is not available, the add by index and delete by index buttons are also not available', () => {
        cy.get('@inputValue').should('be.empty');
        cy.get('@inputIndex').should('be.empty');
        cy.get('@addHead').parent().should('be.disabled')
        cy.get('@addTail').parent().should('be.disabled')
        cy.get('@addIndex').parent().should('be.disabled')
        cy.get('@deleteIndex').parent().should('be.disabled')
    })
    it('Checking the correctness of the default list rendering', () => {
        cy.get('@circle').eq(0).should('contain', '0').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(1).should('contain', '34').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(2).should('contain', '8').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(3).should('contain', '1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@head').eq(0).should('contain', 'head')
        cy.get('@tail').eq(3).should('contain', 'tail')
    })

    it('Checking the correctness of adding an element to head', () => {
        cy.get('@inputValue').type(1);
        cy.get('@addHead').click();
        cy.get('@circle').eq(0).should('contain', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(0).should('contain', '1').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@head').eq(0).should('contain', 'head')
        cy.get('@circle').eq(0).should('contain', '1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })

    it('Checking the correctness of adding an element to tail', () => {
        cy.get('@inputValue').type(1);
        cy.get('@addTail').click();
        cy.get('@circle').eq(3).should('contain', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(4).should('contain', '1').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@tail').eq(4).should('contain', 'tail')
        cy.get('@circle').eq(4).should('contain', '1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })

    it('Checking the correctness of adding an element by index', () => {
        cy.get('@inputValue').type(1);
        cy.get('@inputIndex').type(1);
        cy.get('@addIndex').click();
        cy.get('@circle').eq(0).should('contain', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(1).should('contain', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(0).should('contain', '0').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(1).should('contain', '1').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle').eq(0).should('contain', '0').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(2).should('contain', '34').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(1).should('contain', '1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })

    it('Checking the correctness of removing an element from head', () => {
        cy.get('@deleteHead').click();
        cy.get('@circle').eq(0).should('contain', '').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(1).should('contain', '0').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(0).should('contain', '34').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })

    it('Checking the correctness of removing an element from tail', () => {
        cy.get('@deleteTail').click();
        cy.get('@circle').eq(3).should('contain', '').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(4).should('contain', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@tail').eq(2).should('contain', 'tail')
    })

    it('Checking the correctness of deleting an element by index', () => {
        cy.get('@inputIndex').type(1);
        cy.get('@deleteIndex').click();
        cy.get('@circle').eq(0).should('contain', '0').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(1).should('contain', '').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(2).should('contain', '34').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(0).should('contain', '0').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(1).should('contain', '8').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })
})