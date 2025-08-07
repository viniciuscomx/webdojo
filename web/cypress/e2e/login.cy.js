
//describe é para agrupar um conjunto de testes
//it é uma função que implementa um teste
//Esse arquivo é um teste de login que verifica se o usuário consegue acessar a aplicação com o usuário e senha válidos
//e também verifica se o usuário não consegue acessar a aplicação com usuário e senha inválidos

import { dataAtual } from "../support/utils"

describe('Login', () => {


  it('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    cy.getCookie('login_date').should('exist')

    cy.getCookie('login_date').should((cookie) => {
      expect(cookie.value).to.eq(dataAtual())
    })

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.match(/^[a-fA-F0-9]{32}$/)
    })
  })

  it('Não deve logar com senha invalida', () => {
    //função criada para dar start na aplicação
    //e acessar a página de login
    cy.start()

    //type é para elementos com entradas de dados
    cy.submitLoginForm('papito@webdojo.com', 'katana321')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

  it('Não deve logar com email invalido', () => {
    cy.start()
    cy.submitLoginForm('emailteste@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})


