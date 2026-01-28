# 🚀 Guia de Deploy - Microburbs Landing Page

## Opção 1: Deploy na Vercel (Recomendado - GRÁTIS) ⚡

A Vercel é a plataforma dos criadores do Next.js e oferece deploy gratuito com domínio incluído.

### Passo a Passo:

#### 1. Crie uma conta na Vercel (se não tiver)
Acesse: https://vercel.com/signup

- Pode usar GitHub, GitLab ou email
- É 100% gratuito para projetos pessoais

#### 2. Instale o Vercel CLI (Comando do PowerShell/Terminal)

```bash
npm install -g vercel
```

#### 3. Faça login no Vercel CLI

```bash
vercel login
```

Siga as instruções no navegador para autorizar.

#### 4. Deploy do Projeto

No diretório do projeto, execute:

```bash
vercel
```

O CLI vai perguntar:

- **Set up and deploy "Trial Task Landing Page"?** → `Y` (sim)
- **Which scope?** → Escolha sua conta
- **Link to existing project?** → `N` (não)
- **What's your project's name?** → `microburbs-landing` (ou o nome que preferir)
- **In which directory is your code located?** → `.` (deixe em branco, pressione Enter)

Aguarde o build e deploy (leva ~2 minutos).

#### 5. Configure as Variáveis de Ambiente

Após o primeiro deploy, você precisa adicionar as variáveis de ambiente:

**Método A: Via Dashboard (mais fácil)**

1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione as variáveis:

```
NEXT_PUBLIC_APP_URL = https://seu-projeto.vercel.app
DATABASE_URL = file:./prod.db
```

Variáveis opcionais (adicione depois se quiser):
```
NEXT_PUBLIC_POSTHOG_KEY = [sua chave PostHog]
NEXT_PUBLIC_SENTRY_DSN = [sua chave Sentry]
RESEND_API_KEY = [sua chave Resend]
CRM_WEBHOOK_URL = [URL do seu webhook]
```

**Método B: Via CLI**

```bash
vercel env add NEXT_PUBLIC_APP_URL
# Cole a URL: https://seu-projeto.vercel.app

vercel env add DATABASE_URL
# Cole: file:./prod.db
```

#### 6. Redeploy com as Variáveis

```bash
vercel --prod
```

✅ **Pronto!** Seu site estará no ar em: `https://seu-projeto.vercel.app`

---

## Opção 2: Deploy na Netlify (Alternativa GRÁTIS) 🌐

### Passo a Passo:

#### 1. Crie conta na Netlify
https://app.netlify.com/signup

#### 2. Instale Netlify CLI

```bash
npm install -g netlify-cli
```

#### 3. Login

```bash
netlify login
```

#### 4. Deploy

```bash
netlify deploy
```

- **Create & configure a new site?** → `Y`
- **Team:** Escolha seu time
- **Site name:** `microburbs-landing` (ou outro)
- **Publish directory:** `.next`

Para deploy em produção:

```bash
netlify deploy --prod
```

#### 5. Configure Variáveis de Ambiente

No dashboard da Netlify:
1. Vá em **Site settings** → **Environment variables**
2. Adicione as mesmas variáveis da Vercel

---

## Opção 3: Deploy Manual (Para qualquer servidor)

### Requisitos:
- Node.js 18+ instalado no servidor
- Servidor web (Nginx/Apache) como proxy reverso

### Passo a Passo:

#### 1. Build do Projeto

```bash
npm install
npm run db:generate
npm run build
```

#### 2. Inicie o Servidor

```bash
npm start
```

O app roda na porta 3000 por padrão.

#### 3. Configure Nginx como Proxy (Opcional)

Arquivo `/etc/nginx/sites-available/microburbs`:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ative e reinicie:
```bash
sudo ln -s /etc/nginx/sites-available/microburbs /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

## Opção 4: Deploy com Docker 🐳

### Passo a Passo:

#### 1. Build da Imagem

```bash
docker build -t microburbs-landing .
```

#### 2. Execute o Container

```bash
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_APP_URL=https://seu-dominio.com \
  -e DATABASE_URL=file:./prod.db \
  --name microburbs \
  microburbs-landing
```

Ou use docker-compose:

```bash
docker-compose up -d
```

---

## 🎯 Após o Deploy

### 1. Teste o Site
- Acesse a URL do deploy
- Navegue por todas as páginas
- Teste o formulário de contato
- Verifique no mobile

### 2. Configure Domínio Customizado (Opcional)

**Na Vercel:**
1. Vá em **Settings** → **Domains**
2. Clique em **Add**
3. Digite seu domínio: `microburbs.com`
4. Configure os registros DNS conforme instruções

**Na Netlify:**
1. Vá em **Domain settings**
2. Clique em **Add custom domain**
3. Siga as instruções para configurar DNS

### 3. Configurar Analytics (Opcional mas Recomendado)

#### PostHog (Analytics + A/B Testing)
1. Crie conta em: https://posthog.com
2. Copie a chave da API
3. Adicione como variável de ambiente: `NEXT_PUBLIC_POSTHOG_KEY`
4. Redeploy

#### Sentry (Error Tracking)
1. Crie conta em: https://sentry.io
2. Crie um novo projeto Next.js
3. Copie o DSN
4. Adicione como variável de ambiente: `NEXT_PUBLIC_SENTRY_DSN`
5. Redeploy

### 4. Configurar Email (Opcional)

Para enviar emails de confirmação:

#### Resend (Recomendado)
1. Crie conta em: https://resend.com
2. Crie uma chave API
3. Adicione variáveis:
   ```
   RESEND_API_KEY=re_xxxxx
   EMAIL_FROM=noreply@seu-dominio.com
   ```
4. Verifique seu domínio no Resend

---

## 🔍 Troubleshooting

### Erro de Build
```bash
# Localmente, teste o build:
npm run build

# Se funcionar localmente mas não no deploy, verifique:
# - Variáveis de ambiente
# - Versão do Node.js (deve ser 18+)
```

### Erro de Database
```bash
# Certifique-se de que DATABASE_URL está configurado
# Para produção com SQLite:
DATABASE_URL="file:./prod.db"
```

### Site não carrega CSS
```bash
# Limpe o cache do build e redeploy:
vercel --force
```

### Formulário não funciona
- Verifique se as variáveis de ambiente estão configuradas
- Verifique os logs: `vercel logs` ou no dashboard

---

## 📊 Monitoramento

### Vercel
- **Analytics**: Dashboard → Analytics
- **Logs**: `vercel logs` ou Dashboard → Deployments → View Logs
- **Performance**: Dashboard → Speed Insights

### Métricas para Acompanhar
- ✅ Page views (visitas)
- ✅ CTA clicks (cliques nos botões)
- ✅ Lead form submissions (envios de formulário)
- ✅ Conversion rate (taxa de conversão)
- ✅ Page load speed (velocidade)
- ✅ Error rate (taxa de erros)

---

## 🎉 Pronto!

Seu site está no ar!

**URLs importantes:**
- 🌐 Site: `https://seu-projeto.vercel.app`
- 📊 Dashboard Vercel: https://vercel.com/dashboard
- 📝 Logs: No dashboard, aba "Deployments"

**Próximos passos:**
1. ✅ Compartilhe o link
2. ✅ Configure domínio próprio (opcional)
3. ✅ Configure analytics (PostHog/Sentry)
4. ✅ Teste o formulário de contato
5. ✅ Monitore as conversões

---

## 🆘 Precisa de Ajuda?

- **Documentação Vercel**: https://vercel.com/docs
- **Documentação Next.js**: https://nextjs.org/docs
- **Suporte**: Consulte o README.md do projeto

---

**Sucesso no lançamento! 🚀**
