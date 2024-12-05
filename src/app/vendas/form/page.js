'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function VendaFormPage(props) {

  const router = useRouter()

  const produtos = JSON.parse(localStorage.getItem('produtos')) || []

  const listaPagamentos = [
    "Dinheiro",
    "Cartão de Crédito",
    "Cartão de Débito",
    "Pix"
  ]

  const id = props.searchParams.id
  console.log(props.searchParams.id)

  const vendas = JSON.parse(localStorage.getItem('vendas')) || []
  const vendaEditada = vendas.find(item => item.id == id)

  function salvar(dados) {
    if (vendaEditada) {
      Object.assign(vendaEditada, dados)
      localStorage.setItem('vendas', JSON.stringify(vendas))
    } else {
      dados.id = v4() 
      vendas.push(dados)
      localStorage.setItem('vendas', JSON.stringify(vendas))
    }

    alert("Venda registrada com sucesso!")
    router.push("/vendas")
  }

  const initialValues = {
    dataVenda: '',
    produtoId: '',
    quantidade: 1,
    precoUnitario: '',
    valorTotal: '',
    cliente: '',
    metodoPagamento: ''
  }

  const validationSchema = Yup.object().shape({
    dataVenda: Yup.date().required("Campo obrigatório"),
    produtoId: Yup.string().required("Selecione um produto"),
    quantidade: Yup.number().min(1, "Quantidade mínima é 1").required("Campo obrigatório"),
    precoUnitario: Yup.number().min(0, "Preço inválido").required("Campo obrigatório"),
    valorTotal: Yup.number().min(0, "Valor total inválido").required("Campo obrigatório"),
    metodoPagamento: Yup.string().required("Selecione um método de pagamento")
  })

  return (
    <Pagina titulo={"Cadastro de Venda"}>

      <Formik
        initialValues={vendaEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Data da Venda:</Form.Label>
                <Form.Control
                  name='dataVenda'
                  type='date'
                  value={values.dataVenda}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataVenda && !errors.dataVenda}
                  isInvalid={touched.dataVenda && errors.dataVenda}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataVenda}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Produto:</Form.Label>
                <Form.Select
                  name='produtoId'
                  value={values.produtoId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.produtoId && !errors.produtoId}
                  isInvalid={touched.produtoId && errors.produtoId}
                >
                  <option value=''>Selecione</option>
                  {produtos.map(produto => (
                    <option key={produto.id} value={produto.id}>{produto.nome}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.produtoId}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Quantidade:</Form.Label>
                <Form.Control
                  name='quantidade'
                  type='number'
                  value={values.quantidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.quantidade && !errors.quantidade}
                  isInvalid={touched.quantidade && errors.quantidade}
                />
                <Form.Control.Feedback type='invalid'>{errors.quantidade}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Preço Unitário:</Form.Label>
                <Form.Control
                  name='precoUnitario'
                  type='number'
                  value={values.precoUnitario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.precoUnitario && !errors.precoUnitario}
                  isInvalid={touched.precoUnitario && errors.precoUnitario}
                />
                <Form.Control.Feedback type='invalid'>{errors.precoUnitario}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Valor Total:</Form.Label>
                <Form.Control
                  name='valorTotal'
                  type='number'
                  value={values.valorTotal}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.valorTotal && !errors.valorTotal}
                  isInvalid={touched.valorTotal && errors.valorTotal}
                  disabled
                />
                <Form.Control.Feedback type='invalid'>{errors.valorTotal}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Cliente:</Form.Label>
                <Form.Control
                  name='cliente'
                  type='text'
                  value={values.cliente}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Método de Pagamento:</Form.Label>
                <Form.Select
                  name='metodoPagamento'
                  value={values.metodoPagamento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.metodoPagamento && !errors.metodoPagamento}
                  isInvalid={touched.metodoPagamento && errors.metodoPagamento}
                >
                  <option value=''>Selecione</option>
                  {listaPagamentos.map(pagamento => (
                    <option key={pagamento} value={pagamento}>{pagamento}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.metodoPagamento}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Botões */}
            <Form.Group className='text-end'>
              <Button className='me-2' href='/vendas'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success'><FaCheck /> Registrar Venda</Button>
            </Form.Group>

          </Form>
        )}
      </Formik>

    </Pagina>
  )
}
