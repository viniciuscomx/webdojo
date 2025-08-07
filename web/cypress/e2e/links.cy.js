//o cypress não suporta duas abas ou janelas, então vamos validar o atributo target do link
//esse teste verifica se o link do instagram possui o atributo target com o valor _blank
//basicamente, isso garante que o link será aberto em uma nova aba ou janela quando clicado
before(() => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')
})

describe('links abrindo nova aba/janela', () => {
    it('Validando o atributo do link no instagram', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        //o cypress nao suporta duas abas ou janelas, então vamos validar o atributo target do link
        cy.get('[data-cy="instagram-link"]').should('have.attr', 'target', '_blank')
    })

    it('Validando termos de uso removendo o target blank', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        //removendo o atributo target do link do instagram
        //isso garante que o link não será aberto em uma nova aba ou janela quando clicado
        /*cy.get('[data-cy="instagram-link"]')
            .invoke('removeAttr', 'target')
            .click()*/

        cy.contains('Formulários').click()
        cy.contains('a', 'termos de uso') //para encontrar o link de Termos de Uso
            .invoke('removeAttr', 'target') // Remove o atributo target do link
            .click()

        cy.contains('Termos de Uso')// Verifica se o texto "Termos de Uso" está visível na página
            .should('be.visible')// Verifica se o link foi aberto na mesma aba

    })

})