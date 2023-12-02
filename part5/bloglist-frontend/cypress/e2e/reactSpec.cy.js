describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'xakyth',
      name: 'Roman',
      password: 'p4$$w0rD'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:5173')
  })
  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('#username')
    cy.get('#password')
  })
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('xakyth')
      cy.get('#password').type('p4$$w0rD')
      cy.get('#login-button').click()
      cy.contains('Roman logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('xakyth')
      cy.get('#password').type('wrong_Password')
      cy.get('#login-button').click()
      cy.contains('logged in').should('not.exist')
      cy.contains('wrong username or password').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})