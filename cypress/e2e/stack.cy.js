describe('E2E testing stack', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/stack');
        cy.get('input[type="text"]').as('input')
        cy.get('button').contains('Добавить').as('add')
        cy.get('button').contains('Удалить').as('delete')
        cy.get('button').contains('Очистить').as('clear')
    })

    it('Checking that if the input is empty, then the add button is not available', () => {
        cy.get('@input').should('be.empty');
        cy.get('@add').parent().should('be.disabled')
    })
    it('Check that the element was added to the stack correctly. It is important to make sure that the colors of the elements change and each step of the animation works correctly', () => {
        cy.get('@input').type(1);
        cy.get('@add').click()
        cy.get('[data-testid="circle"]').as('circle')
        cy.get('@circle').eq(0).should('contain', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(0).should('contain', '1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@input').type(2);
        cy.get('@add').click()
        cy.get('@circle').eq(1).should('contain', '2').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(1).should('contain', '2').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })
    it('Check whether an element was removed from the stack correctly', () => {
        cy.get('@input').type(1);
        cy.get('@add').click()
        cy.get('@input').type(2);
        cy.get('@add').click()
        cy.get('[data-testid="circle"]').as('circle')
        cy.wait(1000)
        cy.get('@circle').eq(0).should('exist')
        cy.get('@circle').eq(1).should('exist')
        cy.get('@delete').click()
        cy.get('@circle').eq(0).should('exist')
        cy.get('@circle').eq(1).should('not.exist')
    })
    it('Check the behavior of the Clear button. Add several elements to the stack; when you click on the “Clear” button, the length of the stack should be 0', () => {
        cy.get('@input').type(1);
        cy.get('@add').click()
        cy.get('@input').type(2);
        cy.get('@add').click()
        cy.get('[data-testid="circle"]').as('circle')
        cy.wait(1000)
        cy.get('@circle').should('exist')
        cy.get('@clear').click()
        cy.wait(500)
        cy.get('@circle').should('not.exist')
    })
})