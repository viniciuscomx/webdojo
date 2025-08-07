// esse arquivo é um teste de formulário de consultoria que verifica se o usuário consegue solicitar uma consultoria individual
// também realiza a validação de campos obrigatórios, tipos de entrada e envio do formulário
// e verifica se a mensagem de sucesso é exibida após o envio do formulário

import { personal, inCompany } from '../fixtures/consultancy.json'

beforeEach(() => {
  cy.login()
  cy.goTo('Formulário', 'Consultoria')
})

Cypress.Commands.add('fillConsultancyForm', (form) => {
  cy.get('#name').type(form.nome)
  cy.get('input[placeholder="Digite seu email"]').type(form.email)
  cy.get('input[placeholder="(00) 00000-0000"]').type(form.phone)

  cy.get('#consultancyType').select(form.consultancyType)

  cy.contains('label', form.personType)
    .find('input[type="radio"]')
    .click()
    .should('be.checked')

  cy.contains('label', form.documentType)
    .parent()
    .find('input')
    .type(form.documentNumber)

  form.discoveryChannels.forEach(channel => {
    cy.contains('label', channel)
      .find('input')
      .check()
      .should('be.checked')
  })

  cy.get('input[type="file"]').selectFile(form.file, { force: true })

  cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
    .type(form.description)
    .should('have.value', form.description)

  form.techs.forEach(tech => {
    cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
      .type(tech)
      .type('{enter}')

    cy.contains('label', 'Tecnologias')
      .parent()
      .contains('span', tech)
      .should('be.visible')
  })

  if (form.termsOfUse) {
    cy.contains('label', 'termos de uso')
      .find('input')
      .check()
  }
})

describe('Formulário de Consultoria', () => {
  it('Deve solicitar consultoria individual', () => {
    cy.fillConsultancyForm(personal)

    cy.contains('button', 'Enviar').click()

    cy.get('.modal', { timeout: 70000 })
      .find('.modal-content')
      .should('be.visible')
      .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
  })

  it('Deve solicitar consultoria In Company', () => {
    cy.fillConsultancyForm(inCompany)

    cy.contains('button', 'Enviar').click()

    cy.get('.modal', { timeout: 70000 })
      .find('.modal-content')
      .should('be.visible')
      .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
  })

  it('Deve validar campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.contains('p', 'Campo obrigatório').should('be.visible')
    cy.contains('p', 'Você precisa aceitar os termos de uso').should('be.visible')
  })
})
