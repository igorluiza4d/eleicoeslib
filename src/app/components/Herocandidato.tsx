import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faVideo,faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faInstagram,faSquareInstagram ,faXTwitter, faTiktok,faFacebook } from "@fortawesome/free-brands-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';


import Image from 'next/image'  
interface Bem {
    bem: string;
    valor: string;
  }
interface Rede {
    rede: string;
    url: string;
    icons: string;
}

interface CandidatoProps {
    agremiacao: string;
    cargo: string;
    cidade: string;
    coligacao: string;
    descColigacao: string;
    dtnascimento: string;
    escolaridade: string;
    estadoCivil: string;
    fotoCandidato: string;
    idcandidato: string;
    nome: string;
    nomePartido: string;
    nomeSocial: string;
    nomeUrna: string;
    numCand: string;
    numPartido: string;
    ocupacao: string;
    proposta: string;
    sexo: string;
    siglaPartido: string;
    ufCandidato: string;
    desccolicacao: string;
    bens: Bem[];
    redes: Rede[];
}
const HeroCandidato: React.FC<{dadoscandidato: CandidatoProps}> = ({ dadoscandidato }) => {
    const renderRedeComponent = (rede: Rede) => {
        if (rede.rede.includes("instagram")) {
          return (<><a href = {rede.url} ><FontAwesomeIcon icon={faSquareInstagram} style={{ color: "#013A81", fontSize: 32 }} /></a></>)
        } else if (rede.rede.includes("facebook")) {
            return (<><a href = {rede.url} ><FontAwesomeIcon icon={faFacebook} style={{ color: "#013A81", fontSize: 32 }} /></a></>)
        } else if (rede.rede.includes("linkedin")) {
            return (<><a href = {rede.url} ><FontAwesomeIcon icon={faLinkedin} style={{ color: "#013A81", fontSize: 32 }} /></a></>)
        } else if (rede.rede.includes("twitter")) {
            return (<><a href = {rede.url} ><FontAwesomeIcon icon={faXTwitter} style={{ color: "#013A81", fontSize: 32 }} /></a></>)
        } else if (rede.rede.includes("tiktok")) {
            return (<><a href = {rede.url} ><FontAwesomeIcon icon={faTiktok} style={{ color: "#013A81", fontSize: 32 }} /></a></>)
        } else if (rede.rede.includes("kwai")) {
            return (<><a href = {rede.url} ><FontAwesomeIcon icon={faVideo} style={{ color: "#013A81", fontSize: 32 }} /></a></>)
        } else {
            return (<><a href = {rede.url} ><FontAwesomeIcon icon={faGlobe} style={{ color: "#013A81", fontSize: 32 }} /></a></>)
        }
    };
    
    return (
            <div className='flex bg-gray-100'>
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto border-b border-gray-100">
                <div className="md:flex md:items-center md:gap-12 xl:gap-32">
                    <div className=' grid grid-cols-1 items-center justify-center md:w-1/4'>
                        <div className='flex w-full items-center justify-center'>
                                <Image
                                    src="/candidatos/imagem/pa/belem/FAL20002083024_div.jpg"
                                width={322}
                                height={450}
                                quality={90}
                                alt={dadoscandidato.nome}
                                className="rounded-xl"
                                />
                        </div>
                        <div className='grid grid-cols-1 w-full'>
                                <div className="flex w-full items-center justify-center my-2">
                                    Redes sociais do candidato
                                </div>
                                <ul className="flex w-full items-center justify-center ">
                                {
                                    dadoscandidato.redes.map( ( item,idx)=>{
                                            return(
                                                <li key={idx} className="px-1" >
                                                    {renderRedeComponent(item)}
                                                </li>
                                            )
                                        } 
                                    )
                                }
                                </ul>
                        </div> 
                    </div>        
                    <div className="md:flex-auto md:w-3/4 mt-5 sm:mt-10 lg:mt-0">
                    <div className="space-y-6 sm:space-y-8">
                        <div className="space-y-2 md:space-y-4">
                        <h2 className="font-bold text-3xl lg:text-4xl text-gray-800">
                            <div className='md:grid md:grid-cols-2'>
                                <div className='py-2'>
                                    <p className='text-xl'>NOME DO CANDIDATO:</p>
                                    <p>{dadoscandidato.nome}</p>
                                </div>
                                <div className='py-2'>
                                    <p className='text-xl'>NÚM:</p>
                                    <p>{dadoscandidato.numCand}</p>
                                </div>
    
                            
                            </div>
                        </h2>
                        <p className="text-gray-900 w-3/5">
                            Besides working with start-up enterprises as a partner for digitalization, we have built enterprise products for common pain points that we have encountered in various products and projects.
                        </p>
                        </div>
                        <div className="space-y-3">
                        <dl className="flex flex-col sm:flex-row gap-1">
                            <dt className="min-w-40">
                            <span className="block text-xl text-gray-900">Cargo disputado:</span>
                            </dt>
                            <dd>
                            <ul>
                                <li className="me-1 inline-flex items-center text-xl text-gray-900">
                                {dadoscandidato.cargo}
                                </li>
                            </ul>
                            </dd>
                        </dl>
    
                        <dl className="flex flex-col sm:flex-row gap-1">
                            <dt className="min-w-40">
                            <span className="block text-xl text-gray-900">Nascimento:</span>
                            </dt>
                            <dd>
                            <ul>
                                <li className="me-1 inline-flex items-center text-xl text-gray-900">
                                {dadoscandidato.dtnascimento}
                                </li>
                            </ul>
                            </dd>
                        </dl>
    
                        <dl className="flex flex-col sm:flex-row gap-1">
                            <dt className="min-w-40">
                            <span className="block text-xl text-gray-900">Partido:</span>
                            </dt>
                            <dd>
                            <ul>
                                <li className="me-1 inline-flex items-center text-xl text-gray-900">
                                {dadoscandidato.nomePartido}
                                </li>
                            </ul>
                            </dd>
                        </dl>
                        <dl className="flex flex-col sm:flex-row gap-1">
                            <dt className="min-w-40">
                            <span className="block text-xl text-gray-900">CNPJ da Campanha:</span>
                            </dt>
                            <dd>
                            <ul>
                                <li className="me-1 inline-flex items-center text-xl text-gray-900">
                                55.678.880/0001-44
                                </li>
                            </ul>
                            </dd>
                        </dl>
    
                        <dl className="flex flex-col sm:flex-row gap-1">
                            <dt className="min-w-40">
                            <span className="block text-sm text-gray-500">Candidatura:</span>
                            </dt>
                            <dd>
                            <ul>
                                <li className="me-1 after:content-[','] inline-flex items-center text-sm text-gray-800">
                                DEFERIDA
                                </li>
                            </ul>
                            </dd>
                        </dl>
                        <dl className="flex flex-col sm:flex-row gap-1">
                            <dt className="min-w-40">
                            <span className="block text-sm text-gray-500">Vice:</span>
                            </dt>
                            <dd>
                            <ul>
                                <li className="me-1 after:content-[','] inline-flex items-center text-sm text-gray-800">
                                Daniel Rodrigues
                                </li>
                            </ul>
                            </dd>
                        </dl>
                        </div>
                    </div>
                        <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                            <a className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href={dadoscandidato.proposta}>
                                Plano de Governo
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
                </div>
            </div>    
    );
  };
  
  export default HeroCandidato;