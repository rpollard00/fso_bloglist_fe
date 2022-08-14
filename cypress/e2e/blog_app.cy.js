describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('displays the login form', function() {
    cy.contains('log in to application')
  })

  describe('Can Login to app', function() {
    beforeEach(function () {
      const user = {
        'name': 'Test Johnson',
        'username': 'testuser',
        'password': 'test123',
      }

      cy.request('POST', 'http://localhost:3003/api/users', user)
    })

    it('Login succeeds', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()

      cy.contains('Test Johnson logged in')
    })

    it('Login fails with bad creds', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testbadpw')
      cy.get('#login-button').click()

      cy.get('.error').contains('Failed login attempt')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'logged in')
    })
  })

  describe('When logged in, user can', function() {
    beforeEach(function() {
      const user = {
        'name': 'Test Johnson',
        'username': 'testuser',
        'password': 'test123',
      }

      cy.request('POST', 'http://localhost:3003/api/users', user)

      cy.get('#username').type('testuser')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()
    })

    it('can make a new post', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('This is a blog')
      cy.get('#author').type('Bob Loblaw')
      cy.get('#url').type('www.internets.ca/eh')
      cy.get('#submit-button').click()

      cy.contains('This is a blog').and('contain', 'Bob Loblaw')
    })

    it('can like a blog that exists', function () {
      cy.contains('new blog').click()

      cy.get('#title').type('This is a blog')
      cy.get('#author').type('Bob Loblaw')
      cy.get('#url').type('www.internets.ca/eh')
      cy.get('#submit-button').click()

      cy.contains('This is a blog').parent().contains('view').click()
      cy.contains('This is a blog').parent().contains('like').click()

      cy.contains('This is a blog').parent().contains('1 likes')
    })
  })
})