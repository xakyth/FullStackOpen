describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'xakyth',
      name: 'Roman',
      password: 'p4$$w0rD',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:5173')
  })
  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('#username')
    cy.get('#password')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('xakyth')
      cy.get('#password').type('p4$$w0rD')
      cy.get('#login-button').click()
      cy.contains('Roman logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('xakyth')
      cy.get('#password').type('wrong_Password')
      cy.get('#login-button').click()
      cy.contains('logged in').should('not.exist')
      cy.contains('wrong username or password').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      )
    })
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        username: 'xakyth',
        name: 'Roman',
        password: 'p4$$w0rD',
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.login({ username: 'xakyth', password: 'p4$$w0rD' })
    })
    it('a blog can be created', function () {
      cy.contains('new note').click()
      cy.get('input[placeholder="Title"]').type('Title for new blog')
      cy.get('input[placeholder="Author"]').type('Arthur Bobrov')
      cy.get('input[placeholder="URL"]').type('https://random.org')
      cy.get('button').contains('create').click()
      cy.contains('Title for new blog Arthur Bobrov')
    })
    describe('when blog already exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Automatically created blog',
          author: 'Jon Doe',
          url: 'https://stackoverflow.com/',
          likes: Math.round(Math.random() * 100)
        })
      })
      it('user can like a blog', async function () {
        cy.contains('Automatically created blog').find('button').click()
        cy.contains('div.blogFull', 'Automatically created blog')
          .contains('button', 'like')
          .parent()
          .invoke('text')
          .as('initialLikes')
        let initialLikes
        await cy.get('@initialLikes').then((text) => {
          initialLikes = text
        })
        cy.contains('div.blogFull', 'Automatically created blog')
          .contains('button', 'like')
          .click()
        cy.contains('div.blogFull', 'Automatically created blog')
          .contains('button', 'like')
          .parent()
          .should('contain', `likes ${parseInt(initialLikes.split(' ')[1], 10) + 1}`)
      })
      it('blog creator can delete his blog', function () {
        cy.contains('div.blogShort', 'Automatically created blog').find('button', 'view').click()
        cy.contains('div.blogFull', 'Automatically created blog').contains('button', 'remove').click()
        cy.contains('Automatically created blog').should('not.exist')
      })
      it('only creator see remove button', function () {
        cy.contains('button', 'logout').click()
        const secondUser = {
          username: "dummy",
          password: "$htiRletz",
          name: "Vladimir"
        }
        cy.request('POST', 'http://localhost:3001/api/users', secondUser)
        cy.login({ username: secondUser.username, password: secondUser.password })
        cy.contains('div.blogShort', 'Automatically created blog').contains('button', 'view').click()
        cy.contains('div.blogFull', 'Automatically created blog').contains('button', 'remove').should('not.exist')
      })
    })
  })
})
