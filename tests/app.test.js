import { describe, it, expect } from 'vitest';

describe('todo yksikkötestit', () => {
  it('lisää uuden tehtävän', () => {
    let lista = [];
    let teksti = '  Osta ruokaa  ';
    let tyhjä = teksti.trim() === '';
    if (tyhjä === false) {
      lista.push(teksti.trim());
    }
    expect(lista.length).toBe(1);
    expect(lista[0]).toBe('Osta ruokaa');
  });

  it('ei lisää tyhjää tehtävää', () => {
    let lista = [];
    let teksti = '   ';
    let tyhjä = teksti.trim() === '';
    if (tyhjä === false) {
      lista.push(teksti.trim());
    }
    expect(lista.length).toBe(0);
  });

  it('vaihtaa tilaa edestakaisin', () => {
    let lista = [];
    let tehtava = { id: '1', teksti: 'Testi', tehty: false };
    lista.push(tehtava);
    let vanha = tehtava.tehty;
    tehtava.tehty = !vanha;
    expect(lista[0].tehty).toBe(true);
    vanha = tehtava.tehty;
    tehtava.tehty = !vanha;
    expect(lista[0].tehty).toBe(false);
  });

  it('poistaa tehtävän listasta', () => {
    let lista = [];
    lista.push({ id: '1', teksti: 'A' });
    lista.push({ id: '2', teksti: 'B' });
    let uusiLista = [];
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].id !== '1') {
        uusiLista.push(lista[i]);
      }
    }
    expect(uusiLista.length).toBe(1);
    expect(uusiLista[0].id).toBe('2');
  });
});
