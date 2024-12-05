'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ClientesPage() {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const clientesLocalStorage = JSON.parse(localStorage.getItem("clientes")) || []
    setClientes(clientesLocalStorage)
    console.log(clientesLocalStorage)
  }, [])

  function excluir(cliente) {
    
    if (window.confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`)) {
      const novaLista = clientes.filter(item => item.id !== cliente.id)
      localStorage.setItem('clientes', JSON.stringify(novaLista))
      setClientes(novaLista)
      alert("Cliente excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Clientes"}>

      <div className='text-end mb-2'>
        <Button href='/clientes/form'><FaPlusCircle /> Novo</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Endereço</th>
            <th>Data de Nascimento</th>
            <th>Histórico de Compras</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => {
            return (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.dataNascimento}</td>
                <td>{cliente.historicoCompras}</td>
                <td className='text-center'>
                  <Button className='me-2' href={`/clientes/form?id=${cliente.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(cliente)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

    </Pagina>
  )
}
