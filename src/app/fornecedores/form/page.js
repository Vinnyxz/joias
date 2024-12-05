'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { useState } from 'react'

export default function FornecedorFormPage(props) {

  const [cepErro, setCepErro] = useState(false);  

  const router = useRouter()

  const produtos = JSON.parse(localStorage.getItem('produtos')) || []

  const id = props.searchParams.id
  const fornecedorEditado = produtos.find(item => item.id === id) || {}

  function salvar(dados) {
    
    if (fornecedorEditado) {
      Object.assign(fornecedorEditado, dados)
      localStorage.setItem('fornecedores', JSON.stringify(produtos))
    } else {
      dados.id = v4() 
      produtos.push(dados) 
      localStorage.setItem('fornecedores', JSON.stringify(produtos)) 
    }

    alert("Fornecedor cadastrado com sucesso!")
    router.push("/fornecedores")
  }

  const initialValues = {
    nome: '',
    cnpjCpf: '',
    cep: '',        
    endereco: '',
    telefone: '',
    email: '',
    produtosFornecidos: []
  }

  async function buscarEndereco(cep, setFieldValue) {
    if (!cep || cep.length !== 8) {
      setCepErro(true);
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepErro(true);
        return;
      }

      setFieldValue('endereco', data.logradouro);
      setFieldValue('bairro', data.bairro);
      setFieldValue('cidade', data.localidade);
      setFieldValue('estado', data.uf);
      setCepErro(false);
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
      setCepErro(true);
    }
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cnpjCpf: Yup.string().required("Campo obrigatório").matches(/^[0-9]{11}$|^[0-9]{14}$/, "CNPJ/CPF inválido"),
    cep: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    produtosFornecidos: Yup.array().min(1, "Selecione ao menos um produto")
  })

  return (
    <Pagina titulo={"Cadastro de Fornecedor"}>

      <Formik
        initialValues={fornecedorEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {

          return (
            <Form onSubmit={handleSubmit}>
              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Nome do Fornecedor:</Form.Label>
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
                  <Form.Label>CNPJ/CPF:</Form.Label>
                  <Form.Control
                    name='cnpjCpf'
                    type='text'
                    value={values.cnpjCpf}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cnpjCpf && !errors.cnpjCpf}
                    isInvalid={touched.cnpjCpf && errors.cnpjCpf}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.cnpjCpf}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>CEP:</Form.Label>
                  <Form.Control
                    name='cep'
                    type='text'
                    maxLength="8"
                    value={values.cep}
                    onChange={(e) => {
                      handleChange(e);
                      buscarEndereco(e.target.value, setFieldValue);  
                    }}
                    onBlur={handleBlur}
                    isValid={touched.cep && !errors.cep}
                    isInvalid={touched.cep && errors.cep}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.cep}</Form.Control.Feedback>
                  {cepErro && <div className="text-danger">CEP inválido ou não encontrado</div>}
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
                  <Form.Label>Bairro:</Form.Label>
                  <Form.Control
                    name='bairro'
                    type='text'
                    value={values.bairro}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Cidade:</Form.Label>
                  <Form.Control
                    name='cidade'
                    type='text'
                    value={values.cidade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Estado:</Form.Label>
                  <Form.Control
                    name='estado'
                    type='text'
                    value={values.estado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
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
                  <Form.Label>Produtos Fornecidos:</Form.Label>
                  <Form.Select
                    name='produtosFornecidos'
                    value={values.produtosFornecidos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.produtosFornecidos && !errors.produtosFornecidos}
                    isInvalid={touched.produtosFornecidos && errors.produtosFornecidos}
                    multiple
                  >
                    <option value="">Selecione os produtos fornecidos</option>
                    {produtos.map(produto => (
                      <option key={produto.id} value={produto.id}>{produto.nome}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.produtosFornecidos}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              
              <Form.Group className='text-end'>
                <Button className='me-2' href='/fornecedores'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>

    </Pagina>
  )
}
