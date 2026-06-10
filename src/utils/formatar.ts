
type GlicemiaType = {
    glicemia: number;
    data: Date;
    estado: 'baixa' | 'normal' | 'atencao' | 'alta' | 'perigo';
}
export function getEstado(glicemia: number) {
    if (glicemia < 70) return 'baixa';
    if (glicemia >= 70 && glicemia <= 140) return 'normal';
    if (glicemia > 140 && glicemia <= 180) return 'atencao';
    if (glicemia > 180 && glicemia <= 250) return 'alta';
    if (glicemia > 250) return 'perigo';
    return 'normal';
}

export function formatarData({ data }: { data: Date }) {
    const date = data instanceof Date ? data : new Date(data);

    const hora = new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);

    const diaMes = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
    }).format(date);

    const diaSemana = new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long',
    }).format(date);

    return {
        hora,
        diaMes,
        diaSemana
    };
}