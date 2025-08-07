describe('iFrame', () => {
    it('Deve tocar no video de exemplo', () => {
        cy.login()
        cy.contains('Video').click()

        cy.get('iframe[title="Video Player"]')//obtendo a tag title do iframe  
            .click()
            .should('exist')//verificando se o iframe existe
            .its('0.contentDocument.body')//obtendo o body do iframe
            .should('not.be.empty')//verificando se o body do iframe não está vazio
            .then(cy.wrap)//pega o valor que esta dentro de um iframe
            .as('iframePlayer')

        cy.get('@iframePlayer')//puxando o valor do iframe
            .find('.play-button')//encontrando o botão de play
            .click()



        cy.get('@iframePlayer') //o @ é para puxar o valor do alias
            .find('.pause-button')//encontrando o botão de pause
            .should('be.visible')//verificando se o botão de pause está visível
            .click()
    })

})