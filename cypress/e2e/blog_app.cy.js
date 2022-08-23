describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Test Johnson',
      username: 'testuser',
      password: 'test123',
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('displays the login form', function () {
    cy.contains('log in to application')
  })

  describe('Can Login to app', function () {
    beforeEach(function () {})

    it('Login succeeds', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()

      cy.contains('Test Johnson logged in')
    })

    it('Login fails with bad creds', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testbadpw')
      cy.get('#login-button').click()

      cy.get('.error').contains('Failed login attempt')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'test123' })
    })

    it('can make a new post', function () {
      cy.contains('new blog').click()

      cy.get('#title').type('This is a blog')
      cy.get('#author').type('Bob Loblaw')
      cy.get('#url').type('www.internets.ca/eh')
      cy.get('#submit-button').click()

      cy.contains('This is a blog').and('contain', 'Bob Loblaw')
    })

    describe('a blog already exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()

        cy.get('#title').type('This is a blog')
        cy.get('#author').type('Bob Loblaw')
        cy.get('#url').type('www.internets.ca/eh')
        cy.get('#submit-button').click()
      })

      it('can like a blog that exists', function () {
        cy.contains('This is a blog').parent().contains('view').click()
        cy.contains('This is a blog').parent().contains('like').click()

        cy.contains('This is a blog').parent().contains('1 likes')
      })

      it('can be deleted', function () {
        cy.contains('This is a blog').parent().contains('view').click()
        cy.contains('This is a blog').parent().get('#remove-button').click()
        cy.should('not.contain', 'This is a blog')
        cy.wait(2000)
      })

      it('cannot be deleted by another user', function () {
        cy.contains('logged in')
        const user = {
          name: 'Test Miller',
          username: 'testmiller',
          password: 'test123',
        }

        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.wait(500)
        cy.get('#logout-button').click()
        cy.wait(500)

        cy.get('#username').type('testmiller')
        cy.get('#password').type('test123')
        cy.get('#login-button').click()

        cy.contains('This is a blog').parent().contains('view').click()
        cy.contains('This is a blog')
          .parent()
          .get('#remove-button')
          .should('not.be.visible')
      })
    })

    describe('multiple blogs', function () {
      beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.createBlog({
          title: 'a first blog',
          author: 'Bob Test1',
          url: 'www.test.com',
          likes: 5,
        })
        cy.createBlog({
          title: 'a second blog',
          author: 'Bob Test1',
          url: 'www.test.com',
          likes: 1,
        })
        cy.createBlog({
          title: 'a third blog',
          author: 'Bob Test1',
          url: 'www.test.com',
          likes: 10,
        })
      })

      it('blogs are ordered by likes', function () {
        cy.contains('a first blog').parent().contains('view').click()
        cy.contains('a second blog').parent().contains('view').click()
        cy.contains('a third blog').parent().contains('view').click()

        cy.get('.blog').eq(0).contains('10 likes')
        cy.get('.blog').eq(1).contains('5 likes')
        cy.get('.blog').eq(2).contains('1 likes')
      })
    })
  })
})
