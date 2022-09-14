const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');
const { expect } = require('@jest/globals');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems('MLB2145104504');

    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o `cartItems` como parâmetro.', ()=> {
    getSavedCartItems('cartItems');

    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
