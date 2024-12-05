'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ClienteFormPage(props) {

  const router = useRouter()

  const id = props.searchParams.id

  const clientes = JSON.parse(localStorage.getItem('clientes')) || []

  const clienteEditado = clientes.find(item => item.id === id)

  function salvar(dados) {
    if (clienteEditado) {
      Object.assign(clienteEditado, dados)
      localStorage.setItem('clientes', JSON.stringify(clientes))
    } else {
      dados.id = v4()
      clientes.push(dados)
      localStorage.setItem('clientes', JSON.stringify(clientes))
    }

    alert("Cliente salvo com sucesso!")
    router.push("/clientes")
  }

  const initialValues = {
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    dataNascimento: '',
    historicoCompras: ''
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    historicoCompras: Yup.string()
  })

  return (
    <Pagina titulo={"Cadastro de Cliente"}>


      <Formik
        initialValues={clienteEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {

            return (
              <Form onSubmit={handleSubmit}>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Nome Completo:</Form.Label>
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
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                      name='telefone'
                      type='text'
                      value={values.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.telefone && !errors.telefone}
                      isInvalid={touched.telefone && errors.telefone}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      name='email'
                      type='email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control
                      name='endereco'
                      type='text'
                      value={values.endereco}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.endereco && !errors.endereco}
                      isInvalid={touched.endereco && errors.endereco}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.endereco}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Data de Nascimento:</Form.Label>
                    <Form.Control
                      name='dataNascimento'
                      type='date'
                      value={values.dataNascimento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataNascimento && !errors.dataNascimento}
                      isInvalid={touched.dataNascimento && errors.dataNascimento}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.dataNascimento}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Histórico de Compras:</Form.Label>
                    <Form.Control
                      name='historicoCompras'
                      as='textarea'
                      rows={3}
                      value={values.historicoCompras}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.historicoCompras && !errors.historicoCompras}
                      isInvalid={touched.historicoCompras && errors.historicoCompras}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.historicoCompras}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group className='text-end'>
                  <Button className='me-2' href='/clientes'><FaArrowLeft /> Voltar</Button>
                  <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                </Form.Group>
              </Form>
            )
          }
        }
      </Formik>

    </Pagina>
  )
}
