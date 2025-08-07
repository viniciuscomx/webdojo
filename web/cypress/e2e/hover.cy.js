//mouse hover é um evento que ocorre quando o mouse passa sobre um elemento, como um link ou botão, sem clicar nele.
//isso pode ser usado para exibir informações adicionais, como dicas ou menus suspensos
//esse teste verifica se o mouse hover funciona corretamente em um link específico
//usando o plugin cypress-real-events para simular o mouse hover

describe('Simulando mouse hover', () => {
    it('deve mostrar um texto ao passar o mouse em cima do link do instagram', () => {
        cy.login()
        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')
    })

}) 