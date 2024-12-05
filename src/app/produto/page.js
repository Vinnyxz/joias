'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ProdutosPage() {

  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    const produtosLocalStorage = JSON.parse(localStorage.getItem("produtos")) || []
    setProdutos(produtosLocalStorage)
    console.log(produtosLocalStorage)
  }, [])

  function excluir(produto) {
    if (window.confirm(`Deseja realmente excluir o produto ${produto.nome}?`)) {
      const novaLista = produtos.filter(item => item.id !== produto.id)
      localStorage.setItem('produtos', JSON.stringify(novaLista))
      setProdutos(novaLista)
      alert("Produto excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Produtos (Joias)"}>
      <div className='text-end mb-2'>
        <Button href='/produto/form'><FaPlusCircle /> Novo Produto</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Material</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Fornecedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => {
            return (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.categoria}</td>
                <td>{produto.material}</td>
                <td>{produto.preco.toFixed(2)}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.fornecedor}</td>
                <td className='text-center'>
                  <Button className='me-2' href={`/produto/form?id=${produto.id}`}><FaPen /></Button>
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
