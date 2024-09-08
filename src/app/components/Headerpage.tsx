import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";

import Image from 'next/image'
function Headerpage(){
    return(
            <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-3 bg-[#013A81] text-white">
            <nav className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6 md:px-8 mx-auto">
                <div className="md:col-span-3">
                <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="../templates/creative-agency/index.html" aria-label="Preline">
                <Image
                    src="/logo_oliberal.svg"
                    // width={161}
                    // height={225}
                    width={160}
                    height={22}
                    alt="O Liberal"
                />      
                </a>
                </div>

                <div className="flex items-center gap-x-1 md:gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
                <Image
                    src="/logos-eleicoes-oliberal.png"
                    // width={161}
                    // height={225}
                    width={100}
                    height={48}
                    alt="Eleições 2024 -O Liberal"
                /> 
                <div className="ml-8 md:hidden">
                    <button type="button" className="bg-white hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-blue-500 dark:hover:bg-blue-500 dark:focus:bg-neutral-700" id="hs-navbar-hcail-collapse" aria-expanded="false" aria-controls="hs-navbar-hcail" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-hcail">
                            <FontAwesomeIcon icon={faBars} className="text-blue-900 text-lg" />
                    </button>
                </div>
                </div>

                <div id="hs-navbar-hcail" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6" aria-labelledby="hs-navbar-hcail-collapse">
                <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
                    <div>
                    <a className="relative inline-block text-white focus:outline-none before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 dark:text-white" href="#" aria-current="page">Apuração</a>
                    </div>
                    <div>
                    <a className="inline-block text-white hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300" href="#">Últimas Notícias</a>
                    </div>
                    <div>
                    <a className="inline-block text-white hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300" href="#">Candidatos</a>
                    </div>
                </div>
                </div>
            </nav>
            </header>
    )
}
export default Headerpage;