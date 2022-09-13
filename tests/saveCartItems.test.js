const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
// const { expect } = require('chai');
const { expect } = require('@jest/globals');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('MLB2145104504');

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave `cartItems` e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    saveCartItems('cartItem');

    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItem');
  });
});
