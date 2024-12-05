'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function VendasPage() {

  const [vendas, setVendas] = useState([])

  useEffect(() => {
    const vendasLocalStorage = JSON.parse(localStorage.getItem("vendas")) || []
    setVendas(vendasLocalStorage)
    console.log(vendasLocalStorage)
  }, [])

  function excluir(venda) {
    if (window.confirm(`Deseja realmente excluir a venda com ID ${venda.id}?`)) {
      const novaLista = vendas.filter(item => item.id !== venda.id)
      localStorage.setItem('vendas', JSON.stringify(novaLista))
      setVendas(novaLista)
      alert("Venda excluída com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Vendas"}>
      <div className='text-end mb-2'>
        <Button href='/vendas/form'><FaPlusCircle /> Nova Venda</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID da Venda</th>
            <th>Data da Venda</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Valor Total</th>
            <th>Cliente</th>
            <th>Método de Pagamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map(venda => {
            const valorTotal = venda.quantidadeVendida * venda.precoUnitario;
            return (
              <tr key={venda.id}>
                <td>{venda.id}</td>
                <td>{new Date(venda.dataVenda).toLocaleDateString()}</td>
                <td>{venda.produto.nome}</td>
                <td>{venda.quantidadeVendida}</td>
                <td>{venda.precoUnitario.toFixed(2)}</td>
                <td>{valorTotal.toFixed(2)}</td>
                <td>{venda.cliente ? `${venda.cliente.nome} (${venda.cliente.telefone})` : 'Não registrado'}</td>
                <td>{venda.metodoPagamento}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/vendas/form?id=${venda.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(venda)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
