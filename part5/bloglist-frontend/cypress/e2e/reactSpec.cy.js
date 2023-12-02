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
})