# 🚀 Deploy Rápido - 5 Minutos

## Método 1: Vercel CLI (Mais Rápido)

### Passo 1: Instalar Vercel
```bash
npm install -g vercel
```

### Passo 2: Login
```bash
vercel login
```
(Abrirá o navegador para autenticar)

### Passo 3: Deploy
```bash
cd "c:\Users\felip\OneDrive\Área de Trabalho\Trial Task Landing Page"
vercel
```

Responda:
- Deploy? → `Y`
- Link to existing? → `N`
- Project name? → `microburbs-landing`
- Directory? → (deixe vazio, aperte Enter)

### Passo 4: Configurar Variáveis (no dashboard)
1. Acesse: https://vercel.com/dashboard
2. Clique no projeto
3. Settings → Environment Variables
4. Adicione:
   - `NEXT_PUBLIC_APP_URL` = https://seu-projeto.vercel.app
   - `DATABASE_URL` = file:./prod.db

### Passo 5: Deploy Final
```bash
vercel --prod
```

✅ **PRONTO! Seu site está no ar!**

---

## Método 2: GitHub + Vercel (Com CI/CD)

### Passo 1: Criar Repositório no GitHub
1. Acesse: https://github.com/new
2. Nome: `microburbs-landing`
3. Privacidade: Privado ou Público
4. Clique **Create repository**

### Passo 2: Conectar Repositório Local
```bash
cd "c:\Users\felip\OneDrive\Área de Trabalho\Trial Task Landing Page"

# Adicionar remote
git remote add origin https://github.com/SEU-USUARIO/microburbs-landing.git

# Push
git branch -M main
git push -u origin main
```

### Passo 3: Conectar Vercel
1. Acesse: https://vercel.com/new
2. Clique **Import Git Repository**
3. Selecione seu repositório `microburbs-landing`
4. Configure:
   - Framework Preset: Next.js (detecta automaticamente)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Adicione Environment Variables:
   ```
   NEXT_PUBLIC_APP_URL = https://seu-projeto.vercel.app
   DATABASE_URL = file:./prod.db
   ```
6. Clique **Deploy**

✅ **PRONTO! Agora todo push no GitHub faz deploy automático!**

---

## 🎯 Após o Deploy

### Testar o Site
- [ ] Página inicial carrega
- [ ] Navegação funciona
- [ ] Formulário de contato funciona
- [ ] Mobile está responsivo
- [ ] Dark mode funciona

### URLs Importantes
- 🌐 **Site**: https://seu-projeto.vercel.app
- 📊 **Dashboard**: https://vercel.com/dashboard
- 📝 **Logs**: Dashboard → Deployments → View Logs

### Configurar Domínio Próprio (Opcional)
1. Vercel Dashboard → Settings → Domains
2. Add Domain → Digite seu domínio
3. Configure DNS conforme instruções

---

## 🔧 Comandos Úteis

```bash
# Ver logs em tempo real
vercel logs

# Ver deployments
vercel ls

# Remover deployment
vercel rm [deployment-url]

# Ver domínios
vercel domains ls

# Deploy de uma branch específica
vercel --prod
```

---

## 🆘 Problemas Comuns

### "Command 'vercel' not found"
```bash
npm install -g vercel
# Se ainda não funcionar, reinicie o terminal
```

### Build falhou
```bash
# Teste localmente primeiro:
npm install
npm run db:generate
npm run build

# Se funcionar, o problema pode ser variáveis de ambiente
```

### Formulário não envia
- Verifique se `NEXT_PUBLIC_APP_URL` está configurado
- Verifique logs: `vercel logs`

---

## 📱 Compartilhar

Após o deploy, compartilhe:
- Link direto: `https://seu-projeto.vercel.app`
- QR Code: Use https://qr.io para criar um QR code do link

---

**Dúvidas?** Consulte [DEPLOY.md](DEPLOY.md) para guia completo!
