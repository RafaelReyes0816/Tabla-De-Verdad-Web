export type ScenarioVariable = {
  symbol: string;
  label: string;
};

export type Scenario = {
  id: string;
  title: string;
  description: string;
  variables: ScenarioVariable[];
  expression: string;
  explanation: string;
  extraNote?: string;
};

const scenarios: Scenario[] = [
  {
    id: 'alarma',
    title: 'Alarma Antirrobo',
    description: 'La alarma se activa si la puerta está abierta o la ventana está rota, a menos que la casa esté encendida (simulación de que hay alguien dentro).',
    variables: [
      { symbol: 'P', label: 'Puerta abierta' },
      { symbol: 'V', label: 'Ventana rota' },
      { symbol: 'C', label: 'Casa encendida' },
    ],
    expression: '(P ∨ V) ∧ ∼C',
    explanation: 'La alarma suena solo cuando alguien intenta entrar (puerta o ventana) Y la casa no está encendida (simulando que no hay nadie). Si hay alguien dentro, la alarma no se activa porque podría ser un falso positivo.',
  },
  {
    id: 'semaforo',
    title: 'Semáforo Inteligente',
    description: 'Nunca debe encenderse la luz verde y la roja al mismo tiempo. Esta es una tautología: una condición que siempre debe cumplirse en un sistema de tráfico seguro.',
    variables: [
      { symbol: 'V', label: 'Verde encendido' },
      { symbol: 'R', label: 'Rojo encendido' },
    ],
    expression: '∼(V ∧ R)',
    explanation: 'En un semáforo bien diseñado, NUNCA se encienden el verde y el rojo simultáneamente. Esto es una tautología: la expresión siempre es verdadera. Si fallara, causaría accidentes de tránsito.',
    extraNote: 'Clasificación: Tautología — siempre verdadero.',
  },
  {
    id: 'acceso',
    title: 'Control de Acceso Biométrico',
    description: 'Se puede ingresar si se tiene tarjeta y PIN, o si se reconoce la huella dactilar.',
    variables: [
      { symbol: 'T', label: 'Tarjeta válida' },
      { symbol: 'P', label: 'PIN correcto' },
      { symbol: 'H', label: 'Huella reconocida' },
    ],
    expression: '(T ∧ P) ∨ H',
    explanation: 'Tener solo la tarjeta no basta, necesitas el PIN también. Pero si pones la huella y te reconoce, entras aunque no tengas tarjeta. Este es el mismo sistema que usan edificios corporativos y bancos.',
  },
  {
    id: 'lavadora',
    title: 'Lavadora (Seguridad)',
    description: 'El ciclo de lavado solo puede iniciar si la puerta está cerrada y el tambor tiene agua, pero el bloqueo de seguridad no está activado.',
    variables: [
      { symbol: 'C', label: 'Puerta cerrada' },
      { symbol: 'L', label: 'Tambor lleno' },
      { symbol: 'B', label: 'Bloqueo activado' },
    ],
    expression: '(C ∧ L) ∧ ∼B',
    explanation: 'La lavadora solo funciona cuando todo está en orden: puerta cerrada, agua suficiente y sin bloqueo de seguridad. Si cualquiera de estas condiciones falla, la lavadora no inicia el ciclo.',
  },
  {
    id: 'votacion',
    title: 'Votación por Mayoría',
    description: 'Una decisión se aprueba si al menos 2 de 3 jueces votan a favor.',
    variables: [
      { symbol: 'A', label: 'Juez A vota sí' },
      { symbol: 'B', label: 'Juez B vota sí' },
      { symbol: 'C', label: 'Juez C vota sí' },
    ],
    expression: '(A ∧ B) ∨ (B ∧ C) ∨ (A ∧ C)',
    explanation: 'Con 3 jueces, la decisión se aprueba cuando al menos 2 están de acuerdo. Este sistema evita que una sola persona tenga todo el poder, pero tampoco requiere unanimidad absoluta. Se usa en juicios, comités y sistemas de votación electrónica.',
  },
  {
    id: 'sumador',
    title: 'Sumador Binario (1 bit)',
    description: 'La suma de dos bits produce un bit de suma (XOR) y un bit de acarreo (AND). Este es el bloque básico con el que funcionan todos los procesadores.',
    variables: [
      { symbol: 'A', label: 'Primer bit' },
      { symbol: 'B', label: 'Segundo bit' },
    ],
    expression: '(A ∆ B) = Suma, (A ∧ B) = Acarreo',
    explanation: 'Cuando sumamos dos bits: si ambos son 1, la suma da 0 y llevamos 1 (acarreo). Si solo uno es 1, la suma da 1 y no hay acarreo. Esta operación combinada de XOR y AND es el corazón de todos los procesadores modernos.',
    extraNote: 'Esta escenario tiene dos expresiones: Suma = A ∆ B (XOR), Acarreo = A ∧ B (AND).',
  },
];

export default scenarios;
