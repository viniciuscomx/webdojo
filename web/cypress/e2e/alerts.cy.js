describe('Validação de alertas em Js', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar a mensgame de seta', () => {

        //ouvinte que vai ouvir o window.alert
        cy.on('Window.alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou uma Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um dialogo e validar a resposta positiva', () => {
        cy.on('window.confirm', (msg) => {
            expert(msg).to.equal('Aperta um botão!')
            return false;
        })

        cy.on('window.confirm', (msg) => {
            expert(msg).to.equal('Você clicou em Ok!')
            return true;
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })


    it('Deve cancelar um dialogo e validar a resposta negativa', () => {
        cy.on('window.confirm', (msg) => {
            expert(msg).to.equal('Aperta um botão!')
            return false;
        })

        cy.on('window.alert', (msg) => {
            expert(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('deve interagir com um prompt, inserir um texto e validar uma mensagem', () => {
        
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Vinicius')
        })
        cy.on('window.alert', (msg) => {
            expert(msg).to.equal('Olá Vinicius! Boas vindas ao WebDojo')
        })

        cy.contains('button', 'Mostrar Prompt').click()
    })
})