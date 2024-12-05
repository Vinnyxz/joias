'use client';

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function RelatorioEstoqueGrafico() {
    const [dados, setDados] = useState(null);

    useEffect(() => {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

        if (produtos.length === 0) {
            setDados({
                quantidadeEstoque: { labels: [], datasets: [] },
                valorTotalEstoque: { labels: [], datasets: [] },
                statusReabastecimento: { labels: [], datasets: [] },
            });
            return;
        }

        const nomesProdutos = produtos.map(produto => produto.nome);
        const quantidadeProdutos = produtos.map(produto => produto.quantidade);

        const valorTotalProdutos = produtos.map(produto => produto.quantidade * produto.precoUnitario);

        const statusReabastecimento = produtos.reduce((acc, produto) => {
            if (produto.statusReabastecimento === 'Precisa Reabastecer') {
                acc.precisa.push(produto.nome);
            } else {
                acc.naoPrecisa.push(produto.nome);
            }
            return acc;
        }, { precisa: [], naoPrecisa: [] });

        setDados({
            quantidadeEstoque: {
                labels: nomesProdutos,
                datasets: [{
                    label: 'Quantidade em Estoque',
                    data: quantidadeProdutos,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }],
            },
            valorTotalEstoque: {
                labels: nomesProdutos,
                datasets: [{
                    label: 'Valor Total em Estoque (R$)',
                    data: valorTotalProdutos,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                }],
            },
            statusReabastecimento: {
                labels: ['Precisa Reabastecer', 'Não Precisa Reabastecer'],
                datasets: [{
                    data: [statusReabastecimento.precisa.length, statusReabastecimento.naoPrecisa.length],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1,
                }],
            },
        });
    }, []);

    if (!dados) {
        return <div>Carregando gráfico...</div>;
    }

    return (
        <Pagina>
            <div style={{ width: '80%', margin: '0 auto' }}>
                <h2 className="text-center my-4">Gráfico de Relatório de Estoque</h2>

                <h3 className="text-center my-4">Quantidade em Estoque por Joia</h3>
                <Bar data={dados.quantidadeEstoque} options={{ responsive: true }} />

                <h3 className="text-center my-4">Valor Total em Estoque por Joia</h3>
                <Bar data={dados.valorTotalEstoque} options={{ responsive: true }} />

                <h3 className="text-center my-4">Status de Reabastecimento</h3>
                <Pie data={dados.statusReabastecimento} options={{ responsive: true }} />
            </div>
        </Pagina>
    );
}
