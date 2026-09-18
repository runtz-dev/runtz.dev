import Link from 'next/link';

export default function NotFound() {
  return <main className="nl-container"><section className="nl-empty"><p className="nl-eyebrow">404</p><h1>Esta leitura não está por aqui.</h1><p>O artigo ou a página que você procura não foi encontrado.</p><Link href="/newsletter" className="nl-button nl-button-primary">Voltar à newsletter</Link></section></main>;
}
