describe('Testing page transitions', function() {
    it('home page', () => {
      cy.visit('/');
    });
    it('recursion page', () => {
      cy.visit('/recursion')
    })
    it('fibonacci page', () => {
      cy.visit('/fibonacci')
    })
    it('sorting page', () => {
      cy.visit('/sorting')
    })
    it('stack page', () => {
      cy.visit('/stack')
    })
    it('queue page', () => {
      cy.visit('/queue')
    })
    it('list page', () => {
      cy.visit('/list')
    })
  });