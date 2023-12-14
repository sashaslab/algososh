describe('E2E Fibonacci testing', () => {
    beforeEach(() => {
       cy.visit('http://localhost:3000/fibonacci');
       cy.get('input[type="number"]').as('input');
       cy.get('button[type="submit"]').as('button');
    })

   it('Check that if the input is empty, then the add button is not available', () => {
    cy.get('@input').should('be.empty');
    cy.get('@button').should('be.disabled');
   }) 

   it('Check that the numbers are generated correctly', () => {
    cy.get('@input').type(4)
    cy.get('@button').click()
    cy.get('[data-testid="circle"]').as('circle')
    cy.get('@circle').eq(0).should('contain', '1')
    cy.get('@circle').eq(1).should('contain', '1')
    cy.get('@circle').eq(2).should('contain', '2')
    cy.get('@circle').eq(3).should('contain', '3')
    cy.get('@circle').eq(4).should('contain', '5')
   })
})