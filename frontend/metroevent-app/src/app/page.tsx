"use client";

import Link from 'next/link';
import Image from 'next/image';
import backimg1 from '../../components/img/backimg1.png';
import backimg2 from '../../components/img/backimg2.png';
import backimg3 from '../../components/img/backimg3.png';
import logo from '../../components/img/logoM.png';
import musica from '../../components/img/musica.png';
import arte from '../../components/img/arte.png';
import vidanoc from '../../components/img/vidanoc.png';
import negocios from '../../components/img/negocios.png';
import conferencia from '../../components/img/conferencia.png';
import comida from '../../components/img/comida.png';
import deportivo from '../../components/img/deportivo.png';
import sociales from '../../components/img/sociales.png';

export default function Page() {
  const backgroundImages = [backimg1, backimg2, backimg3];

  const categorias = [
    { nombre: "Música", img: musica },
    { nombre: "Artes", img: arte },
    { nombre: "Vida Nocturna", img: vidanoc },
    { nombre: "Negocios", img: negocios },
    { nombre: "Conferencias y charlas", img: conferencia },
    { nombre: "Comida y Bebidas", img: comida },
    { nombre: "Deportivo", img: deportivo },
    { nombre: "Sociales", img: sociales },
  ];

  return (
    <div className="relative w-full">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className="w-full h-[80vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(${image.src})`,
          }}
        />
      ))}
      
      <div className="pt-9 absolute top-0 left-0 w-full flex flex-col items-center justify-start min-h-screen gap-24">
        <div className="bg-white p-[0.5vw] rounded-2xl w-[95vw] flex gap-8 h-[12] items-center">
          <Image className="ml-4 my-3 w-[10vw] h-[5vw]" src={logo} alt="Logo" priority />
          <div className="rounded-3xl border-4 border-black items-center justify-center flex w-[26vw] text-black h-[7vh]">
            evento
          </div>
          <div className="rounded-3xl border-4 border-black items-center justify-center flex w-[26vw] text-black h-[7vh]">
            ciudad
          </div>
          <Link href="/login" passHref>
            <div className="rounded-2xl bg-[#7101FF] border-black items-center justify-center flex w-[11.8vw] text-white h-[7vh] cursor-pointer oxygen-bold">
              LOGIN
            </div>
          </Link>
          <Link href="/register" passHref>
            <div className="rounded-2xl bg-[#7101FF] border-black items-center justify-center flex w-[11.8vw] text-white h-[7vh] cursor-pointer oxygen-bold">
              REGISTER
            </div>
          </Link>
        </div>
        <div className='w-[75vw] h-[30vh] flex-col items-center text-white text-[5vw] protest-strike-regular'>
          <div>
            Descubre y&nbsp;
            <span className="text-[#7101FF] ">
              crea
            </span>
            &nbsp;momentos 
          </div>
          <div>
            inolvidables
          </div>
        </div>
        <div className='w-[75vw] bg-white rounded-lg p-4'>
          <div className='flex justify-between items-center mx-4'>
            <div className='text-black text-[2vw] oxygen-bold'>
              Categorías
            </div>
            <div className='text-black oxygen-regular text-[1vw]'>
              Ver Todos
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4 justify-center justify-items-center oxygen-regular text-black pt-4'>
            {categorias.map((categoria, index) => (
              <button
                key={index}
                className="w-[17vw] h-[15vh] rounded-lg bg-white border-2 border-[#979797] hover:bg-[#7101FF] hover:border-black transition-colors duration-300 flex flex-col items-center justify-center"
              >
                <div className="text-center">{categoria.nombre}</div>
                <Image src={categoria.img} alt={categoria.nombre} width={50} height={50} className="mt-2" />
              </button>
            ))}
          </div>
          <div className='flex justify-between items-center mx-4 py-4'>
            <div className='text-black text-[2vw] oxygen-bold'>
              Populares
            </div>
            <div className='text-black oxygen-regular text-[1vw]'>
              Ver Todos
            </div>
          </div>
          <div className='flex mx-2 gap-4'>
            <div className='w-[27vw] h-[50vh] rounded-xl bg-white border-2 border-[#979797] oxygen-bold flex flex-col'>
              {/* USER */}
              <div className='flex items-center h-[13%] p-2 text-black text-[1.2vw]'>
                <Image src={logo} alt="Usuario" width={30} height={30} className="rounded-full bg-white" />
                <span className="ml-2">Nombre Usuario</span>
              </div>
              {/* Imagen del evento */}
              <div className='w-full h-[48%]' style={{ height: '48%' }}>
                <Image src={backimg1} alt="Imagen del Evento" objectFit="cover" className='w-full h-full' />
              </div>
              {/* Nombre del evento */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Nombre del Evento
              </div>
              {/* Ubicación */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Ubicación
              </div>
              {/* Fecha */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Fecha y Hora
              </div>
            </div>

            <div className='w-[27vw] h-[50vh] rounded-xl bg-white border-2 border-[#979797] oxygen-bold flex flex-col'>
              {/* USER */}
              <div className='flex items-center h-[13%] p-2 text-black text-[1.2vw]'>
                <Image src={logo} alt="Usuario" width={30} height={30} className="rounded-full bg-white" />
                <span className="ml-2">Nombre Usuario</span>
              </div>
              {/* Imagen del evento */}
              <div className='w-full h-[48%]' style={{ height: '48%' }}>
                <Image src={backimg1} alt="Imagen del Evento" objectFit="cover" className='w-full h-full' />
              </div>
              {/* Nombre del evento */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Nombre del Evento
              </div>
              {/* Ubicación */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Ubicación
              </div>
              {/* Fecha */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Fecha y Hora
              </div>
            </div>

          </div>
          <div className='flex justify-between items-center mx-4 py-4'>
            <div className='text-black text-[2vw] oxygen-bold'>
              Nevos eventos
            </div>
            <div className='text-black oxygen-regular text-[1vw]'>
              Ver Todos
            </div>
          </div>
          <div className='flex mx-2 gap-4'>
            <div className='w-[27vw] h-[50vh] rounded-xl bg-white border-2 border-[#979797] oxygen-bold flex flex-col'>
              {/* USER */}
              <div className='flex items-center h-[13%] p-2 text-black text-[1.2vw]'>
                <Image src={logo} alt="Usuario" width={30} height={30} className="rounded-full bg-white" />
                <span className="ml-2">Nombre Usuario</span>
              </div>
              {/* Imagen del evento */}
              <div className='w-full h-[48%]' style={{ height: '48%' }}>
                <Image src={backimg1} alt="Imagen del Evento" objectFit="cover" className='w-full h-full' />
              </div>
              {/* Nombre del evento */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Nombre del Evento
              </div>
              {/* Ubicación */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Ubicación
              </div>
              {/* Fecha */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Fecha y Hora
              </div>
            </div>

            <div className='w-[27vw] h-[50vh] rounded-xl bg-white border-2 border-[#979797] oxygen-bold flex flex-col'>
              {/* USER */}
              <div className='flex items-center h-[13%] p-2 text-black text-[1.2vw]'>
                <Image src={logo} alt="Usuario" width={30} height={30} className="rounded-full bg-white" />
                <span className="ml-2">Nombre Usuario</span>
              </div>
              {/* Imagen del evento */}
              <div className='w-full h-[48%]' style={{ height: '48%' }}>
                <Image src={backimg1} alt="Imagen del Evento" objectFit="cover" className='w-full h-full' />
              </div>
              {/* Nombre del evento */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Nombre del Evento
              </div>
              {/* Ubicación */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Ubicación
              </div>
              {/* Fecha */}
              <div className='h-[13%]  flex items-center justify-start text-black mx-4 text-[1.2vw]'>
                Fecha y Hora
              </div>
            </div>

          </div>
          

        </div>
      </div>
    </div>
  );
}
