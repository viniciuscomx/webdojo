// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Esse arquivo contem os comandos customizados (funções) que serão usados nos testes 

//importando plugins necessários
import 'cypress-real-events'

import { dataAtual } from "../support/utils"

//inicia a aplicação e acessa a página de login
Cypress.Commands.add('start', () => {
  cy.visit('/')
})

// Comando customizado para submeter o formulário de login
Cypress.Commands.add('submitLoginForm', (email, senha) => {
  cy.get('#email').type(email)
  cy.get('#password').type(senha)
  cy.contains('button', 'Entrar').click()
})

// Comando customizado para navegar até uma página específica
Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
  cy.contains('button', buttonName)
    .should('be.visible')
    .click()

  cy.contains('h1', pageTitle)
    .should('be.visible')
})


//helper com usuário e senha para login
Cypress.Commands.add('login', (ui = false) => { //ui siginifica Interface do Usuário, quer dizer "testar como o usuário o sistema , interagindo com a tela, campos e etc"

  if (ui === true) {

    //fazendo login inserindo usuário e senha
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

  } else {

    //criando cookie e passando token para o login
    //faz pular a tela de login e indo direto pro dashboard
    const token = 'e1033d63a53fe66c0fd3451c7fd8f617'
    const loginDate = dataAtual()

    cy.setCookie('login_date', loginDate)

    cy.visit('/dashboard', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', token)
      }
    })
  }
})
