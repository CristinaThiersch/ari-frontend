import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-secondary fixed w-full top-0 left-0">
      <div className="flex flex-wrap justify-between items-center py-2 max-w-[56.25rem] mx-auto">
        <Link to="/home">
          <img
            src="./img/logo-atual.png"
            alt="logo ARI"
            className="w-[5rem] h-[5rem]"
          />
        </Link>
        <nav>
          <ul className="flex flex-wrap justify-evenly gap-6">
            <li>
              <Link to="/home">Início</Link>
            </li>
            <li>
              <Link to="/medicamento">Medicamentos</Link> {}
            </li>
            <li>
              <Link to="/prescricao">Prescrições</Link> {}
            </li>
            <li>
              <Link to="/historico">Histórico</Link> {}
            </li>
            <li>
              <Link to="/login">Sair</Link> {}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
