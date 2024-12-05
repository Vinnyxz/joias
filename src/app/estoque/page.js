'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function RelatorioEstoquePage() {

  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    const produtosLocalStorage = JSON.parse(localStorage.getItem("produtos")) || []
    setProdutos(produtosLocalStorage)
    console.log(produtosLocalStorage)
  }, [])

  function excluir(produto) {
    if (window.confirm(`Deseja realmente excluir a joia ${produto.nome}?`)) {
      const novaLista = produtos.filter(item => item.id !== produto.id)
      localStorage.setItem('produtos', JSON.stringify(novaLista))
      setProdutos(novaLista)
      alert("Joia excluída com sucesso!")
    }
  }

  const calcularValorTotal = (quantidade, precoUnitario) => {
    return (quantidade * precoUnitario).toFixed(2)
  }

  return (
    <Pagina titulo={"Lista de Relatório de Estoque de Joias"}>
      <div className='text-end mb-2'>
        <Button href='/estoque/form'><FaPlusCircle /> Novo</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade em Estoque</th>
            <th>Preço Unitário</th>
            <th>Valor Total em Estoque</th>
            <th>Status de Reabastecimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => {
            const valorTotal = calcularValorTotal(produto.quantidade, produto.precoUnitario)

            return (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.quantidade}</td>
                <td>{`R$ ${produto.precoUnitario.toFixed(2)}`}</td>
                <td>{`R$ ${valorTotal}`}</td>
                <td>{produto.statusReabastecimento}</td>
                <td className='text-center'>
                  <Button className='me-2' href={`/estoque/form?id=${produto.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(produto)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
