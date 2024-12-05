'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FornecedoresPage() {

  const [fornecedores, setFornecedores] = useState([])

  useEffect(() => {
    const fornecedoresLocalStorage = JSON.parse(localStorage.getItem("fornecedores")) || []
    setFornecedores(fornecedoresLocalStorage)
    console.log(fornecedoresLocalStorage)
  }, [])

  function excluir(fornecedor) {
    if (window.confirm(`Deseja realmente excluir o fornecedor ${fornecedor.nome}?`)) {
      const novaLista = fornecedores.filter(item => item.id !== fornecedor.id)
      localStorage.setItem('fornecedores', JSON.stringify(novaLista))
      setFornecedores(novaLista)
      alert("Fornecedor excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Fornecedores"}>
      <div className='text-end mb-2'>
        <Button href='/fornecedores/form'><FaPlusCircle /> Novo</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ/CPF</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Produtos Fornecidos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(fornecedor => {
            return (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cnpjCpf}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>
                  {fornecedor.produtosFornecidos.map(produto => produto.nome).join(', ')}
                </td>
                <td className='text-center'>
                  <Button className='me-2' href={`/fornecedores/form?id=${fornecedor.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(fornecedor)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
