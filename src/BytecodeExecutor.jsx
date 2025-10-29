import { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const BytecodeExecutor = () => {
  const [inputCode, setInputCode] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [buffer, setBuffer] = useState('');
  const [puntero, setPuntero] = useState(0);
  const [salida, setSalida] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState(-1);
  const [instructionHistory, setInstructionHistory] = useState([]);
  const [speed, setSpeed] = useState(1000);

  const opcodes = {
    '0x00': { name: 'NOP', descript: 'Sin operación', desc: 'No hacer nada (espera)' },
    '0x01': { name: 'TAKE', descript: 'Tomar', desc: 'Tomar letra actual y añadir al buffer' },
    '0x02': { name: 'NEXT', descript: 'Siguiente', desc: 'Mover puntero a siguiente letra' },
    '0x03': { name: 'PRINT', descript: 'Imprimir', desc: 'Mostrar contenido del buffer' },
    '0x04': { name: 'SEND', descript: 'Enviar', desc: 'Entregar buffer al receptor' },
    '0x05': { name: 'CLR', descript: 'Limpiar', desc: 'Limpiar el buffer' },
    '0xff': { name: 'HALT', descript: 'Alto', desc: 'Terminar ejecución' }
  };

  const parseCode = (code) => {
    return code.trim().split(/\s+/).filter(c => c.length > 0);
  };

  const runProgram = async () => {
    const instructions = parseCode(inputCode);
    setIsRunning(true);
    setCurrentInstruction(0);
    setInstructionHistory([]);
    
    // Estado local para ejecución sincrónica
    let localBuffer = '';
    let localPuntero = 0;
    let localSalida = [];
    let localHistory = [];

    for (let i = 0; i < instructions.length; i++) {
      setCurrentInstruction(i);
      const opcode = instructions[i].toLowerCase();
      let log = `[${opcode.toUpperCase()}] `;

      switch (opcode) {
        case '0x00':
          log += 'Esperando...';
          break;

        case '0x01':
          if (localPuntero < mensaje.length) {
            const letra = mensaje[localPuntero];
            localBuffer += letra;
            log += `Tomada letra "${letra}" → Buffer: "${localBuffer}"`;
          } else {
            log += '⚠️ ERROR: Puntero fuera de rango';
            alert(`❌ Error en instrucción ${i}: El puntero (${localPuntero}) excede el tamaño del mensaje (${mensaje.length} caracteres).\n\nNo se puede ejecutar TAKE.`);
          }
          break;

        case '0x02':
          if (localPuntero < mensaje.length - 1) {
            localPuntero++;
            log += `Puntero movido a posición ${localPuntero}`;
          } else {
            log += '⚠️ ADVERTENCIA: Ya en la última posición';
            alert(`⚠️ Advertencia en instrucción ${i}: El puntero ya está en la última posición (${localPuntero}).\n\nNo se puede mover más adelante. El mensaje tiene ${mensaje.length} caracteres.`);
          }
          break;

        case '0x03':
          localSalida.push(localBuffer);
          log += `Impreso en pizarra: "${localBuffer}"`;
          break;

        case '0x04':
          localSalida.push(`📤 ENVIADO: ${localBuffer}`);
          log += `Buffer enviado al receptor: "${localBuffer}"`;
          break;

        case '0x05':
          log += `Buffer limpiado (contenía: "${localBuffer}")`;
          localBuffer = '';
          break;

        case '0xff':
          log += 'Programa terminado';
          break;

        default:
          log += `Código desconocido: ${instructions[i]}`;
      }

      localHistory.push(log);
      
      // Actualizar el estado de React para mostrar los cambios
      setBuffer(localBuffer);
      setPuntero(localPuntero);
      setSalida([...localSalida]);
      setInstructionHistory([...localHistory]);

      if (opcode === '0xFF') {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, speed));
    }

    setCurrentInstruction(-1);
    setIsRunning(false);
  };

  const reset = () => {
    setBuffer('');
    setPuntero(0);
    setSalida([]);
    setCurrentInstruction(-1);
    setInstructionHistory([]);
    setIsRunning(false);
  };

  const loadExample = (example) => {
    reset();
    switch(example) {
      case 1:
        setMensaje("HOLA MUNDO");
        setInputCode('0x01 0x02 0x01 0x02 0x01 0x02 0x01 0x02 0x01 0x02 0x01 0x02 0x01 0x02 0x01 0x02 0x01 0x02 0x01 0x04 0xff');
        break;
      case 2:
        setMensaje("SOS");
        setInputCode('0x01 0x02 0x01 0x02 0x01 0x03 0x04 0xff');
        break;
      case 3:
        setMensaje("TEST");
        setInputCode('0x01 0x03 0x05 0x02 0x01 0x03 0xff');
        break;
    }
  };

  const instructions = parseCode(inputCode);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl">
        {/* <h1 className="text-4xl">
          Ejecutor Visual de Bytecode
        </h1> */}
        <h1 className="text-center text-gray-400">Simulador de instrucciones hexadecimales</h1>
        
        {/* Tabla de Referencia */}
        <div className="bg-slate-800 mt-6 mb-4">
          <h2 className="text-xl">📖 Tabla de Referencia</h2>
          <div className="overflow-x-auto">
            <table className="reference-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Instrucción</th>
                  <th>Nombre (Español)</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(opcodes).map(([code, info]) => (
                  <tr key={code}>
                    <td className="table-code">{code.toUpperCase()}</td>
                    <td className="table-name">{info.name}</td>
                    <td>{info.descript}</td>
                    <td className="table-desc">{info.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-2">

          {/* Panel de Control */}
          <div className="bg-slate-800">
            <h2 className="text-xl">⚙️ Panel de Control</h2>
            
            <div className="mb-4">
              <label>Palabra "MENSAJE":</label>
              <input
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value.toUpperCase())}
                disabled={isRunning}
              />
            </div>

            <div className="mb-4">
              <label>Código (separado por espacios):</label>
              <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                disabled={isRunning}
              />
            </div>

            <div className="mb-4">
              <label>Velocidad: {speed}ms</label>
              <input
                type="range"
                min="0"
                max="2000"
                step="10"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isRunning}
              />
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={runProgram}
                disabled={isRunning}
                className="flex-1 btn-green"
              >
                <Play size={20} /> Ejecutar
              </button>
              <button
                onClick={reset}
                className="flex-1 btn-red"
              >
                <RotateCcw size={20} /> Reset
              </button>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">Ejemplos:</p>
              <div className="flex gap-2">
                <button onClick={() => loadExample(1)} className="btn-slate">Ej. 1</button>
                <button onClick={() => loadExample(2)} className="btn-slate">Ej. 2</button>
                <button onClick={() => loadExample(3)} className="btn-slate">Ej. 3</button>
              </div>
            </div>
          </div>

          {/* Estado Actual */}
          <div className="bg-slate-800">
            <h2 className="text-xl">📊 Estado Actual</h2>
            
            <div className="space-y-4">
              <div className="bg-slate-700">
                <p className="text-sm text-gray-400 mb-2">Palabra:</p>
                <div className="flex gap-2">
                  {mensaje.split('').map((letra, idx) => (
                    <div
                      key={idx}
                      className={`letra-box ${idx === puntero ? 'active' : ''}`}
                    >
                      {letra}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">Puntero en posición: {puntero}</p>
              </div>

              <div className="bg-slate-700">
                <p className="text-sm text-gray-400 mb-2">Buffer:</p>
                <div className="buffer-display">
                  {buffer || <span className="empty-text">vacío</span>}
                </div>
              </div>

              <div className="bg-slate-700">
                <p className="text-sm text-gray-400 mb-2">Pizarra (Salida):</p>
                <div className="output-display">
                  {salida.length === 0 ? (
                    <p className="empty-text text-sm">Sin salida</p>
                  ) : (
                    salida.map((item, idx) => (
                      <p key={idx} className="output-item">{item}</p>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Instrucciones */}
        <div className="grid grid-cols-2">
          <div className="bg-slate-800">
            <h2 className="text-xl">📋 Programa Cargado</h2>
            <div className="instruction-list">
              {instructions.map((inst, idx) => {
                const opInfo = opcodes[inst.toLowerCase()];
                return (
                  <div
                    key={idx}
                    className={`instruction-item ${currentInstruction === idx ? 'active' : ''}`}
                  >
                    <span className="instruction-number">
                      {String(idx).padStart(2, '0')}
                    </span>
                    <span className="instruction-code">{inst.toUpperCase()}</span>
                    <span className="instruction-desc">
                      {opInfo ? `${opInfo.name} - ${opInfo.desc}` : 'Desconocido'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-800">
            <h2 className="text-xl">📜 Historial de Ejecución</h2>
            <div className="history-display">
              {instructionHistory.length === 0 ? (
                <p className="empty-text">No hay historial aún...</p>
              ) : (
                instructionHistory.map((log, idx) => (
                  <p key={idx} className="history-item">{log}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BytecodeExecutor;