# Avaliações reais do Google Maps

O site já está preparado para buscar as avaliações reais da Renovo Massagem pela
Google Places API (New). A chave fica somente no servidor e nunca é enviada para
o navegador.

## 1. Criar o projeto no Google Cloud

1. Acesse https://console.cloud.google.com/ com a conta Google que será usada no projeto.
2. Abra o seletor de projetos no topo da página.
3. Clique em **Novo projeto**.
4. Use um nome como **Renovo Massagem Site** e conclua a criação.
5. Confirme no seletor superior que o projeto novo está ativo.

## 2. Vincular o faturamento

1. No menu do Google Cloud, abra **Faturamento**.
2. Vincule uma conta de faturamento ao projeto.
3. Em **Faturamento > Orçamentos e alertas**, crie um orçamento pequeno e habilite
   alertas por e-mail para acompanhar o consumo.
4. Em **APIs e serviços > Cotas e limites do sistema**, reduza a cota de consultas
   por minuto para um valor compatível com o acesso esperado no lançamento. Os
   alertas de orçamento avisam sobre gastos, mas não interrompem cobranças sozinhos.

A Google Places API exige faturamento habilitado. O campo de avaliações pertence
à categoria Place Details Enterprise + Atmosphere e pode gerar cobrança conforme
o uso atual da plataforma.

## 3. Ativar a Places API (New)

1. Abra **APIs e serviços > Biblioteca**.
2. Pesquise por **Places API (New)**.
3. Abra o resultado com esse nome exato e clique em **Ativar**.

## 4. Criar e restringir a chave

1. Abra **APIs e serviços > Credenciais**.
2. Clique em **Criar credenciais > Chave de API**.
3. Copie a chave criada e clique em **Editar chave de API**.
4. Dê o nome **Renovo Site - Places Server**.
5. Em **Restrições de API**, selecione **Restringir chave**.
6. Marque somente **Places API (New)** e salve.
7. Para produção, aplique também restrição por endereço IP quando a hospedagem
   possuir um IP de saída fixo. Durante o desenvolvimento local, mantenha a chave
   protegida no arquivo `.env.local` e nunca a coloque em variáveis `VITE_*`.

## 5. Configurar o projeto local

Crie um arquivo chamado `.env.local` na raiz do projeto com:

```env
GOOGLE_PLACES_API_KEY="COLE_A_CHAVE_AQUI"
GOOGLE_PLACE_ID=""
GOOGLE_PLACE_QUERY="Renovo Massagem, R. José Cleto, 200 - Palmares, Belo Horizonte - MG, 31160-470"
```

O `.env.local` já é ignorado pelo Git. Depois de salvar, reinicie o servidor de
desenvolvimento.

```powershell
npm.cmd run dev
```

Na primeira consulta, o servidor encontra automaticamente o perfil correto e
mostra no terminal uma linha parecida com:

```text
[Google Reviews] Place ID encontrado: ChIJ...
```

Copie esse valor para `GOOGLE_PLACE_ID` no `.env.local`. Assim, os próximos
inícios do servidor usam diretamente o perfil e evitam uma consulta extra de
Text Search.

## 6. Conferir a integração

1. Abra o site local.
2. Vá até **O que nossos clientes dizem**.
3. Confirme que aparecem nota, quantidade, nomes, fotos, comentários e datas reais.
4. Abra **Ver avaliação no Google Maps** em um card e confira a fonte original.
5. Opcionalmente, abra http://localhost:3000/api/google-reviews para conferir o
   retorno da API e o `placeId` resolvido.

## 7. Configurar na hospedagem

Cadastre estas variáveis como segredos no painel da hospedagem:

- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_PLACE_ID`
- `GOOGLE_PLACE_QUERY` (opcional quando o Place ID já estiver definido)

Não coloque a chave no código, no GitHub ou em variáveis com prefixo `VITE_`.
Reinicie ou publique novamente o serviço depois de salvar os segredos.

### Vercel

O projeto inclui a função serverless `api/google-reviews.ts`, que disponibiliza
as avaliações em `/api/google-reviews` sem enviar a chave para o navegador.

Depois de cadastrar ou alterar as variáveis em **Settings > Environment
Variables**, faça uma nova implantação. A Vercel não aplica variáveis novas a
uma implantação que já estava pronta.

`GOOGLE_PLACE_ID` é opcional. Se você ainda não tiver um Place ID válido, remova
essa variável ou deixe seu valor vazio; a função localizará o estabelecimento
usando `GOOGLE_PLACE_QUERY`.

## Comportamento sem chave ou durante falhas

Se a chave ainda não estiver configurada, ou se o Google ficar indisponível, o
site não mostra avaliações fictícias. Ele exibe um cartão seguro com um botão
para abrir o perfil oficial da Renovo Massagem no Google Maps.
