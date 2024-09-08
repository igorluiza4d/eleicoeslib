import Link from 'next/link';

interface HeroCapaBoxProps {
  title: string;
  highlight: string;
  description: string;
  breadcrumb: { label: string; href: string }[]; // Adiciona o breadcrumb como prop
}

function HeroCapaBox({ title, highlight, description, breadcrumb }: HeroCapaBoxProps) {
  return (
    <div className="relative bg-indigo-900 bg-opacity-25 overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        {/* Link to Eleições Municipais */}
        <div className="grid grid-col-1 justify-center capitalize">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="flex space-x-2 text-sm text-gray-600">
            {breadcrumb.map((item, index) => (
              <li key={index}>
                <Link href={item.href} legacyBehavior>
                  <a className="hover:underline">{item.label}</a>
                </Link>
                {index < breadcrumb.length - 1 && <span> / </span>}
              </li>
            ))}
          </ol>
        </nav>
          <a
            className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 focus:outline-none focus:border-gray-300"
            href="#"
          >
            Eleições Municipais 2024
            <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600">
              Portal O Liberal
            </span>
          </a>
        </div>

        {/* Title and Highlight */}
        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
            {title}{':'}{' '}
            <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
              {highlight}
            </span>
          </h1>
        </div>

        {/* Description */}
        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-lg text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default HeroCapaBox;
