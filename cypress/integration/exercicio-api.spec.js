/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
var faker = require('faker')

describe("Testes da Funcionalidade Usuários", () => {
  it("Deve validar contrato de usuários", () => {
    cy.request("usuarios").then((response) => {
      return contrato.validateAsync(response.body);
    });
  });

  it("Deve listar usuários cadastrados", () => {
    cy.request({
      method: "GET",
      url: "usuarios",
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("usuarios");
    });
  });

  it.only("Deve cadastrar um usuário com sucesso", () => {
    let nomeFaker = faker.name.firstName();
    let emailFaker = faker.internet.email(nomeFaker);

    cy.cadastrarUsuario(nomeFaker, emailFaker, "senha@123", "false").then(
      (response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal(
          "Cadastro realizado com sucesso"
        );
      }
    );
  });

  it("Deve validar um usuário com email inválido", () => {
    //TODO:
  });

  it("Deve editar um usuário previamente cadastrado", () => {
    //TODO:
  });

  it("Deve deletar um usuário previamente cadastrado", () => {
    //TODO:
  });
});
