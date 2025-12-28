describe('todo e2e', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('lisää uusi tehtävä', () => {
    cy.get('#topic').type('  Osta ruokaa  ');
    cy.get('#save-btn').click();
    cy.get('#task-list .task').should('have.length', 1);
    cy.get('#task-list .task .title').should('contain', 'Osta ruokaa');
  });

  it('ei lisää tyhjää tehtävää', () => {
    cy.get('#topic').type('   ');
    cy.get('#save-btn').click();
    cy.get('#task-list .task').should('have.length', 0);
    cy.get('#empty-state').should('be.visible');
  });

  it('vaihtaa tilaa edestakaisin', () => {
    cy.get('#topic').type('Testi');
    cy.get('#save-btn').click();
    cy.get('#task-list .task').should('have.length', 1);
    cy.get('#task-list .task').first().should('not.have.class', 'done');
    cy.get('#task-list .task')
      .first()
      .within(() => {
        cy.get('button[data-action="complete"]').click();
      });
    cy.get('#task-list .task').first().should('have.class', 'done');
    cy.get('#task-list .task')
      .first()
      .within(() => {
        cy.get('button[data-action="complete"]').click();
      });
    cy.get('#task-list .task').first().should('not.have.class', 'done');
  });

  it('poistaa tehtävän listasta', () => {
    cy.get('#topic').type('A');
    cy.get('#save-btn').click();
    cy.get('#topic').type('B');
    cy.get('#save-btn').click();
    cy.get('#task-list .task').should('have.length', 2);
    cy.get('#task-list .task')
      .first()
      .within(() => {
        cy.get('button[data-action="delete"]').click();
      });
    cy.get('#task-list .task').should('have.length', 1);
    cy.get('#task-list .task .title').should('contain', 'A');
  });
});
