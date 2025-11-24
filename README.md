# **PatriHub — Sistema de Controle de Patrimônio**

O **PatriHub** é um sistema **fullstack** desenvolvido para auxiliar no **controle e gestão de patrimônio**, permitindo o cadastro de bens, herdeiros e o relacionamento entre ambos.  
O projeto foi desenvolvido como entrega da disciplina **Programação Orientada a Objetos em Java** (Prof. Heleno).

Este repositório engloba:

- **Backend:** Java 21 + Spring Boot  
- **Frontend:** React + Vite + TypeScript + Tailwind + **Shadcn/UI**  
- **Documentação:** Swagger  
- **Infra:** Docker + Docker Hub + Vercel

---

## 🚀 **Links do Projeto (Produção)**

- **Frontend:** https://patri-hub.vercel.app/  
- **Swagger (Documentação da API):** https://patrihub-api.onrender.com/swagger-ui/index.html#/  

---

# ⚙️ **Tecnologias Utilizadas**

## **Backend**
- Java 21  
- Spring Boot 3  
- Spring Web  
- Spring Data JPA  
- Spring Security + JWT  
- PostgreSQL  
- Swagger OpenAPI  
- Docker  

## **Frontend**
- React  
- Vite  
- TypeScript  
- TailwindCSS  
- Shadcn/UI  
- Axios  
- Vercel  

---

# 📚 **Funcionalidades Gerais**

### ✔️ Cadastro de bens (Assets)  
### ✔️ Cadastro de herdeiros (Heirs)  
### ✔️ Associação entre bens e herdeiros  
### ✔️ Autenticação via JWT  
### ✔️ Interface moderna com React + Shadcn  
### ✔️ Documentação completa via Swagger  
### ✔️ Deploy backend com Docker + Render  
### ✔️ Deploy frontend com Vercel  

---

# 🏗️ **Arquitetura do Backend (Spring Boot)**

## 📌 **Endpoints (como exibidos no Swagger)**

### **Heir Controller**
| Método | Endpoint | Descrição |
|-------|----------|-----------|
| GET | `/api/heirs/{id}` | Buscar herdeiro por ID |
| PUT | `/api/heirs/{id}` | Atualizar herdeiro |
| DELETE | `/api/heirs/{id}` | Remover herdeiro |
| GET | `/api/heirs` | Listar todos herdeiros |
| POST | `/api/heirs` | Criar herdeiro |

---

### **Asset Controller**
| Método | Endpoint | Descrição |
|-------|----------|-----------|
| PUT | `/api/assets/update/{id}` | Atualizar bem |
| POST | `/api/assets/create` | Criar bem |
| GET | `/api/assets/getById/{id}` | Buscar bem por ID |
| GET | `/api/assets/getAll` | Listar todos os bens |
| DELETE | `/api/assets/delete/{id}` | Deletar bem |

---

### **Auth Controller**
| Método | Endpoint | Descrição |
|-------|----------|-----------|
| POST | `/api/auth/register` | Registrar usuário |
| POST | `/api/auth/login` | Autenticação + Gera token JWT |

---

### **Heir-Asset Controller**
| Método | Endpoint | Descrição |
|-------|----------|-----------|
| POST | `/api/assets/{assetId}/heirs/{heirId}` | Associar bem a herdeiro |
| DELETE | `/api/assets/{assetId}/heirs/{heirId}` | Remover herdeiro de bem |
| GET | `/api/heirs/{heirId}/assets` | Listar bens de um herdeiro |
| GET | `/api/assets/{assetId}/heirs` | Listar herdeiros de um bem |

---

# 🧩 **Frontend (React + Shadcn UI)**

Principais telas:

- Tela de Login  
- Dashboard  
- Cadastro de bens  
- Cadastro de herdeiros  
- Listagem com tabelas responsivas  
- Alerts e componentes do shadcn  
- Consumo da API com Axios  
- Armazenamento do token JWT no `localStorage`  
- Proteção de rotas no frontend  

---

# 🐳 **Docker & Deploy**

## **Backend**
- A imagem é construída e enviada ao Docker Hub  
- Render faz o deploy automaticamente usando a imagem hospedada  

## **Frontend**
- Deploy automático pela Vercel a cada push no GitHub  

---

# 🛠️ **Como rodar o localmente**

```bash
# 🛠️ **Como rodar o backend localmente**
git clone <repo>

cd patrihub-api
./mvnw clean install

docker-compose up -d


# 🛠️ **Como rodar o frontend localmente**

```bash
git clone <repo>

cd patrihub-frontend
./npm install

npm run dev
