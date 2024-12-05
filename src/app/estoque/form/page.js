'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function RelatorioEstoqueFormPage(props) {

  const router = useRouter()

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

    alert("Produto atualizado com sucesso!")
    router.push("/estoque")
  }

  const initialValues = {
    nome: '',
    quantidade: '',
    precoUnitario: '',
    statusReabastecimento: 'Necessita',
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    quantidade: Yup.number().min(0, "Quantidade não pode ser negativa").required("Campo obrigatório"),
    precoUnitario: Yup.number().min(0, "Preço unitário não pode ser negativo").required("Campo obrigatório"),
    statusReabastecimento: Yup.string().required("Campo obrigatório"),
  })

  const calcularValorTotal = (quantidade, precoUnitario) => {
    return (quantidade * precoUnitario).toFixed(2);
  }

  return (
    <Pagina titulo={"Relatório de Estoque de Joias"}>

      <Formik
        initialValues={produtoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {

          const valorTotal = calcularValorTotal(values.quantidade, values.precoUnitario);

          return (
            <Form onSubmit={handleSubmit}>
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
                  <Form.Label>Quantidade em Estoque:</Form.Label>
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
              </Row>

              <Row className='mb-2'>
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

                <Form.Group as={Col}>
                  <Form.Label>Status de Reabastecimento:</Form.Label>
                  <Form.Select
                    name='statusReabastecimento'
                    value={values.statusReabastecimento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.statusReabastecimento && !errors.statusReabastecimento}
                    isInvalid={touched.statusReabastecimento && errors.statusReabastecimento}
                  >
                    <option value='Necessita'>Necessita Reabastecimento</option>
                    <option value='Não necessita'>Não necessita Reabastecimento</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.statusReabastecimento}</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Valor Total em Estoque:</Form.Label>
                  <Form.Control
                    name='valorTotal'
                    type='text'
                    value={`R$ ${valorTotal}`}
                    readOnly
                  />
                </Form.Group>
              </Row>

              <Form.Group className='text-end'>
                <Button className='me-2' href='/estoque'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Salvar</Button>
              </Form.Group>

            </Form>
          )
        }}
      </Formik>

    </Pagina>
  )
}
