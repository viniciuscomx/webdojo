describe('Gerenciamento de perfis Git', () => {
    before(() => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it.skip('Deve poder cadastrar um novo perfil do github', () => {
        cy.log('todo')

        cy.get('#name').type('Vinicius Xavier')
        cy.get('#username').type('vinicius_comx')
        cy.get('#profile').type('Dev')

        cy.contains('button', 'Adicionar Perfil').click()

        //aqui a validação é diretamente pelo campo
        cy.contains('table tbody tr', 'vinicius_comx')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('Vinicius Xavier')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('Dev')
            .should('be.visible')
    })

    it('Deve poder remover um perfil do GitHub', () => {
        const proFile = {
            name: 'Vinicius',
            username: 'viniciusXavier',
            profile: 'Devv'
        }

        //adicionando perfil
        cy.get('#name').type('Vinicius Xavier')
        cy.get('#username').type('vinicius_comx')
        cy.get('#profile').type('Dev')


        //removendo perfil
        cy.contains('button', 'Adicionar Perfil').click()
        cy.contains('table tbody tr', 'vinicius_comx')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile').find('button[title="Remover perfil"]').click()
    })

    it('validando link do perfil no Git', () => {
        const profile = {
            name: 'Vinicius',
            username: 'vinicius_comx',
            perfil: 'Dev'
        }

        //adicionando perfil
        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.perfil)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile').find('a')
            .should('have.attr', 'href', 'https://github.com/' + profile.username)
    })

})