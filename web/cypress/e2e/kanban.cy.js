describe('Kanban Board', () => {
  it('Deve mover várias tarefas para Done e atualizar o board', () => {
    
    // Inicia o sistema e faz login
    cy.login()
    cy.contains('Kanban').click() // Acessa o quadro Kanban

    // Lista com os nomes dos cards que serão movidos para a coluna Done
    const cardsParaMover = [
      'Criar testes E2E',
      'Documentar API',
      'Configurar CI/CD'
    ]

    // Conta quantos cards existem inicialmente na coluna Done
    cy.get('.column-done [draggable=true]').then($cardsAntes => {
      const quantidadeAntes = $cardsAntes.length

      // Itera sobre cada card a ser movido
      cy.wrap(cardsParaMover).each((card) => {
        const dataTransfer = new DataTransfer() // Cria uma nova instância de DataTransfer para simular o arrastar

        // Encontra o card pelo nome e simula o início do arraste
        cy.contains('div[draggable=true]', card)
          .trigger('dragstart', { dataTransfer })

        // Simula o soltamento do card na coluna Done
        cy.get('.column-done')
          .trigger('drop', { dataTransfer })

        // Espera entre ações para garantir que o DOM atualize corretamente
        cy.wait(300)
      })

      // Verifica se o número total de cards na coluna Done aumentou de acordo
      cy.get('.column-done [draggable=true]')
        .should('have.length', quantidadeAntes + cardsParaMover.length)
    })
  })
})
