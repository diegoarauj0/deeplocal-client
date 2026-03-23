# DeepLocal Client

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 📚 Visão geral
Este projeto é o client web (front-end) do [DeepLocal](https://github.com/diegoarauj0/deeplocal-server), responsável pela interface e experiência do usuário na plataforma.

## 🖥️ Tecnologias principais
- **React 19 + Vite 8**
- **TypeScript 5.9**
- **TanStack Query 5**
- **React Hook Form + Joi**
- **Styled Components 6**
- **React Router 7**
- **React Toastify**

## ☁️ Pré-requisitos
- Node.js 24+ (recomendado)
- npm 10+ (ou yarn/pnpm; ajuste os comandos conforme o gerenciador escolhido)
- Backend DeepLocal (API) acessível para consumir os endpoints mencionados no cliente.

## 🚀 Instalação rápida
```bash
git clone https://github.com/diegoarauj0/deeplocal-client.git
cd deeplocal-client
npm install
```

## 📂 Estrutura relevante
- `src/app.tsx` — envolve o app com provedores (Theme, QueryClient, Auth, Toast).
- `src/features` — módulos por domínio (auth, home, link, profile, settings, estilos, compartilhado).

## 📝 Licença
Este projeto é licenciado sob [MIT](LICENSE.md). Veja o arquivo para mais detalhes.
