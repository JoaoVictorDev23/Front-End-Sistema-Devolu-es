import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalNotas: number = 0;

  chart: any;
  chartSituacoes: any;
  notasFiscais: NotaFiscal[] = [];
  todasNotasFiscais: NotaFiscal[] = []; // Variável para armazenar todos os dados do backend
  totalValorVenda: number = 0;
  totalValorArmazem: number = 0;
  totalValorPrejuizo: number = 0;
  dataInicial: string = '';
  dataFinal: string = '';

  constructor(private nfdserviceService: NfdserviceService) { }

  ngOnInit() {
    this.carregarDadosDoBackend();
    this.inicializarGraficoSituacoes();
  }

  carregarDadosDoBackend(): void {
    this.nfdserviceService.getAllNotasFiscaisByAll().subscribe(
      (notasFiscais: NotaFiscal[]) => {
        this.todasNotasFiscais = notasFiscais; // Armazena todos os dados do backend
        this.notasFiscais = this.todasNotasFiscais; // Inicializa com todos os dados
        this.calcularValoresTotais();
        this.atualizarGrafico();
      },
      (error) => {
        console.error('Erro ao carregar dados do backend:', error);
      }
    );
  }

  filtrarDados(): void {
    this.notasFiscais = this.todasNotasFiscais; // Restaura os dados completos antes de aplicar o filtro

    if (this.dataInicial && this.dataFinal) {
      const dataInicialObj = new Date(this.dataInicial);
      const dataFinalObj = new Date(this.dataFinal);
      this.notasFiscais = this.notasFiscais.filter(nota =>
        new Date(nota.valoresDTO.data) >= dataInicialObj && new Date(nota.valoresDTO.data) <= dataFinalObj
      );
    }
    this.calcularValoresTotais();
    this.atualizarGrafico();
  }

  calcularValoresTotais(): void {
    this.totalValorVenda = this.notasFiscais.reduce((total, nota) => total + nota.valoresDTO.valorVenda, 0);
    this.totalValorArmazem = this.notasFiscais.reduce((total, nota) => total + nota.valoresDTO.valorArmazem, 0);
    this.totalValorPrejuizo = this.notasFiscais.reduce((total, nota) => total + nota.valoresDTO.valorPrejuizo, 0);
  }

  atualizarGrafico(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [{
          label: 'Valor de Venda',
          data: [this.totalValorVenda],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }, {
          label: 'Valor de Armazém',
          data: [this.totalValorArmazem],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }, {
          label: 'Valor de Prejuízo',
          data: [this.totalValorPrejuizo],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins:{
          legend:{
            position:'bottom',
            align: 'start',
            

          }
        }
      }
    });
  }

  inicializarGraficoSituacoes(): void {
    this.nfdserviceService.getAllNotasFiscais().subscribe(
      (notasFiscais: NotaFiscal[]) => {
        this.totalNotas = notasFiscais.length; // Atualiza o total de notas
  
        console.log('Dados do Gráfico 2:', notasFiscais); // Adiciona o console.log para verificar os dados recebidos
  
        if (notasFiscais && notasFiscais.length > 0) {
          // Calcular a quantidade de notas em cada situação
          const pendentes = notasFiscais.filter(nota => nota.valoresDTO.situacaoValores === 'Pendente' || nota.dadosNfdDTO.situacao === 'Pendente').length;
          const aprovadas = notasFiscais.filter(nota => nota.valoresDTO.situacaoValores === 'APROVADA' && nota.dadosNfdDTO.situacao === 'APROVADA').length;
          const rejeitadas = notasFiscais.filter(nota => nota.valoresDTO.situacaoValores === 'REJEITADA' && nota.dadosNfdDTO.situacao === 'REJEITADA').length;
          const correcoes = notasFiscais.filter(nota => nota.valoresDTO.situacaoValores === 'CORRECAO' || nota.dadosNfdDTO.situacao === 'CORRECAO').length;
  
          // Configure o gráfico 2 com os dados calculados
          this.chartSituacoes = new Chart('canvasSituacoes', {
            type: 'pie',
            data: {
              labels: ['Pendentes', 'Aprovadas', 'Correções', 'Rejeitadas'],
              datasets: [{
                label: 'Quantidade de Notas por Situação',
                data: [pendentes, aprovadas, correcoes, rejeitadas], // Ajuste para corrigir a ordem dos dados
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 205, 86, 1)',
                  'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              plugins: {
                legend: {
                  position: 'bottom',
                  align: 'start'
                }
              }
            }
          });
        } else {
          // Não há notas cadastradas, define chartSituacoes como null para exibir a mensagem
          this.chartSituacoes = null;
        }
      },
      (error) => {
        console.error('Erro ao carregar dados do segundo gráfico:', error);
      }
    );
  }
  

}
