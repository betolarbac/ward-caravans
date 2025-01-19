import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-2 text-[#167b9c]">Ward Caravans</h1>
        <p className="text-xl mb-8 text-[#167b9c]">
          Gerenciamento Simplificado de Caravanas para sua Ala e Estaca
        </p>

        <p className="text-lg mb-8 text-gray-700">
          O Ward Caravans é a solução ideal para simplificar o gerenciamento de
          caravanas em sua estaca e ala. Nosso dashboard intuitivo oferece
          controle completo sobre usuários do sistema, cadastro de membros para
          caravanas e um sistema integrado de reservas via WhatsApp.
        </p>

        <ul className="text-left text-lg mb-10 text-gray-600 space-y-3">
          <li className="flex items-center">
            <ChevronRight className="mr-2 h-5 w-5 text-[#167b9c]" />
            Gerencie usuários por estaca e ala com facilidade
          </li>
          <li className="flex items-center">
            <ChevronRight className="mr-2 h-5 w-5 text-[#167b9c]" />
            Cadastre e organize membros para caravanas em poucos cliques
          </li>
          <li className="flex items-center">
            <ChevronRight className="mr-2 h-5 w-5 text-[#167b9c]" />
            Faça reservas rapidamente através do nosso bot no WhatsApp
          </li>
          <li className="flex items-center">
            <ChevronRight className="mr-2 h-5 w-5 text-[#167b9c]" />
            Acesse estatísticas e relatórios detalhados em tempo real
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button asChild size="lg" className="w-full sm:w-auto bg-[#167b9c] hover:bg-[#0f5b7c] transition-colors duration-300 ease-in-out">
            <Link href="/auth/signin">Acessar Ward Caravans</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reservar via WhatsApp
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
