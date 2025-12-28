describe('todo e2e', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.on('window:confirm', () => true);
    cy.visit('/');
  });

  it('suodattaa tehtävät prioriteetin mukaan ja poistaa suodatuksen', () => {
    //Luo low, med ja high prio tehtävät
    cy.get('#topic').clear().type('Low');
    cy.get('#priority').select('low');
    cy.get('#save-btn').click();

    cy.get('#topic').clear().type('Medium');
    cy.get('#priority').select('medium');
    cy.get('#save-btn').click();

    cy.get('#topic').clear().type('High');
    cy.get('#priority').select('high');
    cy.get('#save-btn').click();
    //Tarkistaa että kaikki kolme tehtävää näkyy
    cy.get('#task-list .task').should('have.length', 3);
    //Käy läpi kaikki prioriteettifiltterit ja tarkistaa, että vain oikea näkyy
    cy.get('#filter-high').click();
    cy.get('#task-list .task').should('have.length', 1);
    cy.get('#task-list .task .title').should('contain', 'High');

    cy.get('#filter-medium').click();
    cy.get('#task-list .task').should('have.length', 1);
    cy.get('#task-list .task .title').should('contain', 'Medium');

    cy.get('#filter-low').click();
    cy.get('#task-list .task').should('have.length', 1);
    cy.get('#task-list .task .title').should('contain', 'Low');

    // Klikkaa samaa filtteriä uudestaan ja tarkistaa että kaikki tehtävät näkyy
    cy.get('#filter-low').click();
    cy.get('#task-list .task').should('have.length', 3);
    // Klikkaa filter-all nappia ja tarkistaa että kaikki tehtävät tulevat näkyviin
    cy.get('#filter-medium').click();
    cy.get('#task-list .task').should('have.length', 1);
    cy.get('#filter-all').click();
    cy.get('#task-list .task').should('have.length', 3);
  });

  it('Testaa filtterin, kun se ei löydä tehtäviä', () => {
    //Luo low prioriteetin tehtävän
    cy.get('#topic').clear().type('low');
    cy.get('#priority').select('low');
    cy.get('#save-btn').click();
    cy.get('#task-list .task').should('have.length', 1);
    //Käy läpi high ja medium filtterit ja tarkistaa että tehtäviä ei löydy ja tyhjä tila näkyy
    cy.get('#filter-high').click();
    cy.get('#task-list .task').should('have.length', 0);
    cy.get('#empty-state').should('be.visible');

    cy.get('#filter-medium').click();
    cy.get('#task-list .task').should('have.length', 0);
    cy.get('#empty-state').should('be.visible');
    //Poistaa filtterin ja tarkistaa että tehtävä näkyy
    cy.get('#filter-all').click();
    cy.get('#task-list .task').should('have.length', 1);
    cy.get('#empty-state').should('not.be.visible');
  });
});
