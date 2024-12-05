'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ProdutoFormPage(props) {

  const router = useRouter()

  const fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || []

  const produtos = JSON.parse(localStorage.getItem('produtos')) || []

  const id = props.searchParams.id
  console.log(props.searchParams.id)
  const produtoEditado = produtos.find(item => item.id == id)
  console.log(produtoEditado)

  function salvar(dados) {
    if (produtoEditado) {
      Object.assign(produtoEditado, dados)
      localStorage.setItem('produtos', JSON.stringify(produtos))
    } else {
      dados.id = v4()
      produtos.push(dados)
      localStorage.setItem('produtos', JSON.stringify(produtos))
    }

    alert("Produto cadastrado com sucesso!")
    router.push("/produto")
  }

  const listaCategorias = [
    "Anel",
    "Brinco",
    "Colar",
    "Pulseira",
    "Pingente"
  ]

  const listaMateriais = [
    "Ouro",
    "Prata",
    "Diamante",
    "Pérola",
    "Platina"
  ]

  const initialValues = {
    nome: '',
    descricao: '',
    preco: '',
    quantidade: '',
    categoria: '',
    material: '',
    fornecedor: '',
    dataInclusao: new Date().toLocaleDateString()
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    preco: Yup.number().required("Campo obrigatório").min(0, "Preço deve ser maior que zero"),
    quantidade: Yup.number().required("Campo obrigatório").min(0, "Quantidade não pode ser negativa"),
    categoria: Yup.string().required("Campo obrigatório"),
    material: Yup.string().required("Campo obrigatório"),
    fornecedor: Yup.string().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Produto (Joia)"}>
      <Formik
        initialValues={produtoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {/* Campos do formulário */}
              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Nome da Joia:</Form.Label>
                  <Form.Control
                    name='nome'
                    type='text'
                    value={values.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nome && !errors.nome}
                    isInvalid={touched.nome && errors.nome}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Descrição:</Form.Label>
                  <Form.Control
                    name='descricao'
                    type='text'
                    value={values.descricao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.descricao && !errors.descricao}
                    isInvalid={touched.descricao && errors.descricao}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.descricao}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Preço:</Form.Label>
                  <Form.Control
                    name='preco'
                    type='number'
                    min={0}
                    value={values.preco}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.preco && !errors.preco}
                    isInvalid={touched.preco && errors.preco}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.preco}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Quantidade em Estoque:</Form.Label>
                  <Form.Control
                    name='quantidade'
                    type='number'
                    min={0}
                    value={values.quantidade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.quantidade && !errors.quantidade}
                    isInvalid={touched.quantidade && errors.quantidade}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.quantidade}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Categoria:</Form.Label>
                  <Form.Select
                    name='categoria'
                    value={values.categoria}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.categoria && !errors.categoria}
                    isInvalid={touched.categoria && errors.categoria}
                  >
                    <option value=''>Selecione</option>
                    {listaCategorias.map(categoria => <option key={categoria} value={categoria}>{categoria}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.categoria}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Material:</Form.Label>
                  <Form.Select
                    name='material'
                    value={values.material}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.material && !errors.material}
                    isInvalid={touched.material && errors.material}
                  >
                    <option value=''>Selecione</option>
                    {listaMateriais.map(material => <option key={material} value={material}>{material}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.material}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Fornecedor:</Form.Label>
                  <Form.Select
                    name='fornecedor'
                    value={values.fornecedor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.fornecedor && !errors.fornecedor}
                    isInvalid={touched.fornecedor && errors.fornecedor}
                  >
                    <option value=''>Selecione</option>
                    {fornecedores.map(fornecedor => <option key={fornecedor.id} value={fornecedor.nome}>{fornecedor.nome}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.fornecedor}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className='text-end'>
                <Button className='me-2' href='/produto'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }
      </Formik>
    </Pagina>
  )
}
