import HomeSection from '../commons/HomeSection';

export default function About() {
  return (
    <HomeSection sectionClassName="bg-secondary mt-[5.75rem]" id="about">
      <>
        <h2 className="font-bold text-4xl">Sobre nós</h2>
        <p>Ana Cristina Thiersch da Cruz</p>
        <p>
          Trabalho feito como requisito avaliativo da disciplina:
          Desenvolvimento de Aplicações Web II.
        </p>
      </>
    </HomeSection>
  );
}
