export const estadoConfig = {
  baixa: { icon: 'caret-down-sharp', iconColor: '#B50303', background: '#FFEDED', mensagem: 'considerada baixa, se persistir necessário reajustar a medicação' },
  alta: { icon: 'caret-up-sharp', iconColor: '#B50303', background: '#FFEDED', mensagem: 'considerada alta, é importante monitorar e seguir as orientações médicas.' },
  normal: { icon: 'checkmark-circle', iconColor: '#009951', background: '#E0FFF1', mensagem: 'considerada dentro dos níveis normais, continue mantendo hábitos saudáveis.' },
  atencao: { icon: 'warning', iconColor: '#E5A000', background: '#FFFCD8', mensagem: 'considerada no limite do normal, é importante ficar atento e seguir as orientações médicas.' },
  perigo: { icon: 'alert-circle', iconColor: '#B50303', background: '#FFB7B7', mensagem: 'considerada perigosa, isso pode indicar uma situação grave e requer atenção.' },
} as const;