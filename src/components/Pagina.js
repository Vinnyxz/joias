'use client'

import { Container, Nav, Navbar } from "react-bootstrap"


export default function Pagina({ titulo, children }) {

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/produto">Produto</Nav.Link>
            <Nav.Link href="/fornecedores">Fornecedores</Nav.Link>
            <Nav.Link href="/vendas">Vendas</Nav.Link>
            <Nav.Link href="/clientes">Clientes</Nav.Link>
            <Nav.Link href="/estoque">Estoques</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="bg-secondary text-center text-white py-2">
        <h1>{titulo}</h1>
      </div>

      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}